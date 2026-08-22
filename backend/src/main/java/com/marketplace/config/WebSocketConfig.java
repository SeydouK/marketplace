package com.marketplace.config;

import com.marketplace.security.JwtTokenProvider;
import com.marketplace.service.SuiviLivraisonService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

import java.security.Principal;

/**
 * Canal temps réel du suivi de livraison.
 *
 * <p>Remplace le sondage périodique : une position poussée dès son arrivée fait
 * avancer le marqueur, là où un rafraîchissement toutes les quinze secondes le
 * faisait sauter d'un point à l'autre.
 *
 * <p><strong>Le canal est authentifié, et l'abonnement vérifié par livraison.</strong>
 * Un sujet public exposerait la position et l'adresse de n'importe quel acheteur
 * à qui devinerait un identifiant. Deux contrôles distincts :
 *
 * <ul>
 *   <li>à la connexion, le jeton JWT est validé — sans lui, pas de session ;</li>
 *   <li>à l'abonnement, on vérifie que cette personne a le droit de suivre
 *       <em>cette</em> livraison précise.</li>
 * </ul>
 */
@Configuration
@EnableWebSocketMessageBroker
@RequiredArgsConstructor
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    private static final Logger log = LoggerFactory.getLogger(WebSocketConfig.class);

    /** Préfixe des sujets de suivi : /topic/livraisons/{remiseId}/position */
    public static final String PREFIXE_LIVRAISON = "/topic/livraisons/";

    private final JwtTokenProvider jwtTokenProvider;

    /**
     * Résolu à l'abonnement, pas au démarrage.
     *
     * Le service de suivi diffuse lui-même sur ce canal : l'injecter directement
     * ici formerait une boucle que Spring refuse de démarrer.
     */
    private final ObjectProvider<SuiviLivraisonService> suiviService;

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // Courtier en mémoire : suffisant tant qu'il n'y a qu'une instance.
        // Un courtier externe (RabbitMQ) ne devient utile qu'en multi-instance.
        registry.enableSimpleBroker("/topic");
        registry.setApplicationDestinationPrefixes("/app");
    }

    /**
     * Deux points d'entrée pour le même canal.
     *
     * <p>Le premier est un WebSocket natif : c'est celui qu'utilise le client, et
     * le seul chemin sans surcoût. Le second ajoute le repli SockJS, pour les
     * réseaux d'entreprise et les mandataires qui coupent les connexions longues —
     * situation courante ici, où beaucoup passent par des relais mobiles.
     */
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws")
                .setAllowedOriginPatterns("*");

        registry.addEndpoint("/ws-sockjs")
                .setAllowedOriginPatterns("*")
                .withSockJS();
    }

    /**
     * Contrôle d'accès du canal.
     *
     * Placé sur le canal entrant plutôt que dans la chaîne de sécurité HTTP :
     * une connexion STOMP n'est pas une requête, et l'abonnement à un sujet
     * échappe entièrement aux règles d'URL.
     */
    @Override
    public void configureClientInboundChannel(org.springframework.messaging.simp.config.ChannelRegistration registration) {
        registration.interceptors(new ChannelInterceptor() {
            @Override
            public Message<?> preSend(Message<?> message, MessageChannel channel) {
                StompHeaderAccessor accessor =
                        MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
                if (accessor == null) return message;

                if (StompCommand.CONNECT.equals(accessor.getCommand())) {
                    authentifier(accessor);
                } else if (StompCommand.SUBSCRIBE.equals(accessor.getCommand())) {
                    verifierAbonnement(accessor);
                }
                return message;
            }
        });
    }

    /** Valide le jeton transmis en en-tête STOMP et fixe l'utilisateur de la session. */
    private void authentifier(StompHeaderAccessor accessor) {
        String entete = accessor.getFirstNativeHeader("Authorization");
        String jeton = entete != null && entete.startsWith("Bearer ")
                ? entete.substring(7)
                : null;

        if (jeton == null || !jwtTokenProvider.validateToken(jeton)) {
            throw new IllegalArgumentException("Connexion refusée : jeton absent ou invalide.");
        }

        String email = jwtTokenProvider.getUsernameFromToken(jeton);
        accessor.setUser((Principal) () -> email);
    }

    /**
     * Vérifie que l'abonné a le droit de suivre cette livraison.
     *
     * Sans ce contrôle, n'importe quel utilisateur connecté pourrait s'abonner au
     * sujet d'une livraison qui ne le concerne pas et lire, en direct, l'adresse
     * et la position de quelqu'un d'autre.
     */
    private void verifierAbonnement(StompHeaderAccessor accessor) {
        String destination = accessor.getDestination();

        // Refus par defaut. La tentation est de laisser passer ce qu'on ne
        // reconnait pas — aujourd'hui aucun autre sujet n'est publie, donc un
        // abonnement a /topic/autre-chose ne rapporte rien. Mais c'est le sens
        // de la regle qui compte : le jour ou un second sujet apparait, il
        // serait ouvert a tous sans que personne ne l'ait decide.
        if (destination == null || !destination.startsWith(PREFIXE_LIVRAISON)) {
            throw new IllegalArgumentException("Abonnement refusé : destination inconnue.");
        }

        Principal utilisateur = accessor.getUser();
        if (utilisateur == null) {
            throw new IllegalArgumentException("Abonnement refusé : session non authentifiée.");
        }

        Long remiseId = extraireRemiseId(destination);
        if (remiseId == null) {
            throw new IllegalArgumentException("Abonnement refusé : destination invalide.");
        }

        // Réutilise le contrôle d'accès du suivi : acheteur, vendeur ou
        // transporteur affecté. Toute autre personne lève une exception.
        try {
            suiviService.getObject().verifierAccesParEmail(utilisateur.getName(), remiseId);
        } catch (RuntimeException e) {
            log.warn("Abonnement refusé sur {} pour {} : {}",
                    destination, utilisateur.getName(), e.getMessage());
            throw new IllegalArgumentException("Abonnement refusé.");
        }
    }

    /** /topic/livraisons/42/position → 42 */
    private Long extraireRemiseId(String destination) {
        try {
            String reste = destination.substring(PREFIXE_LIVRAISON.length());
            return Long.parseLong(reste.split("/")[0]);
        } catch (Exception e) {
            return null;
        }
    }
}
