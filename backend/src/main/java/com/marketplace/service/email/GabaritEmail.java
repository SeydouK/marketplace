package com.marketplace.service.email;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * Mise en page commune de tous les emails BétailMarket.
 *
 * <p>Un en-tête de marque (logo), une carte blanche qui porte le message, un
 * bouton d'action et un pied de page. Les couleurs sont celles du design
 * system du front (jetons {@code ink}, {@code canvas}, {@code brand-*}…), pour
 * que l'email et l'application se reconnaissent.
 *
 * <p>Contraintes des clients mail, qui expliquent la forme du HTML :
 * <ul>
 *   <li>mise en page en tableaux et styles en ligne — Outlook ignore flexbox et
 *       une partie des feuilles de style ;</li>
 *   <li>logo en PNG hébergé avec le front — Gmail n'affiche ni le SVG ni les
 *       images en {@code data:} ; son texte alternatif est stylé pour rester
 *       lisible quand les images sont bloquées ;</li>
 *   <li>aucune police web : Georgia tient lieu de Fraunces pour les titres.</li>
 * </ul>
 */
@Component
public class GabaritEmail {

    // Jetons du design system (frontend/tailwind.config.js)
    public static final String ENCRE = "#1F1C17";
    public static final String ENCRE_2 = "#5B5348";
    public static final String ENCRE_3 = "#8A8174";
    public static final String FOND = "#F4F0E8";
    public static final String LIGNE = "#E8E2D6";
    public static final String VERT = "#2D6A4F";
    public static final String VERT_FONCE = "#1B4332";
    public static final String VERT_DOUX = "#F1F6F2";
    public static final String VERT_BORD = "#C2DCCB";
    public static final String ORANGE = "#9A5B0E";
    public static final String ORANGE_DOUX = "#FCF3E3";
    public static final String ORANGE_BORD = "#F1D6A6";

    private static final String POLICE = "-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";
    private static final String POLICE_TITRE = "Georgia,'Times New Roman',serif";

    private final String frontendUrl;
    private final String logoUrl;

    /** Identifiant du logo joint au message, quand il ne peut pas être servi par URL. */
    public static final String LOGO_CID = "logo-betailmarket";
    /** Le même PNG que {@code frontend/src/assets/email/logo.png}, dans le classpath. */
    public static final String LOGO_RESSOURCE = "email/logo.png";

    /**
     * Source du logo, par ordre de préférence :
     * <ol>
     *   <li>{@code app.mail.logo-url}, si renseignée ;</li>
     *   <li>l'asset du front, si le front est public ;</li>
     *   <li>sinon (front en {@code localhost}, que Gmail ne peut pas joindre) une
     *       image jointe au message, référencée par {@code cid:} — voir
     *       {@link SmtpEmailSender}.</li>
     * </ol>
     */
    public GabaritEmail(@Value("${app.frontend.url}") String frontendUrl,
                        @Value("${app.mail.logo-url:}") String logoUrl) {
        this.frontendUrl = frontendUrl;
        if (logoUrl != null && !logoUrl.isBlank()) {
            this.logoUrl = logoUrl;
        } else if (estLocal(frontendUrl)) {
            this.logoUrl = "cid:" + LOGO_CID;
        } else {
            this.logoUrl = frontendUrl + "/assets/email/logo.png";
        }
    }

    private static boolean estLocal(String url) {
        return url == null || url.isBlank()
                || url.contains("://localhost") || url.contains("://127.0.0.1") || url.contains("://0.0.0.0");
    }

    /** Email simple : titre, corps et bouton d'action. */
    public String page(String titre, String corps, String libelleBouton, String lien) {
        return page(null, titre, corps, libelleBouton, lien, null);
    }

    /**
     * Email complet.
     *
     * @param apercu        texte affiché par la boîte de réception à côté du sujet
     *                      (facultatif) ; sans lui, Gmail montre le début du corps
     * @param titre         titre du message, déjà échappé
     * @param corps         HTML du message, contenu saisi par les utilisateurs déjà échappé
     * @param libelleBouton libellé du bouton d'action (facultatif)
     * @param lien          cible du bouton
     * @param note          petit texte sous le bouton (facultatif) : lien de secours,
     *                      durée de validité, consigne de sécurité
     */
    public String page(String apercu, String titre, String corps,
                       String libelleBouton, String lien, String note) {
        String bouton = libelleBouton == null || lien == null ? "" : """
                <tr><td style="padding:8px 32px 4px">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
                    <td bgcolor="%s" style="border-radius:12px">
                      <a href="%s" target="_blank" style="display:inline-block;padding:14px 26px;font-family:%s;
                         font-size:15px;font-weight:700;color:#FFFFFF;text-decoration:none;border-radius:12px">%s</a>
                    </td>
                  </tr></table>
                </td></tr>
                """.formatted(VERT, lien, POLICE, libelleBouton);

        String blocNote = note == null || note.isBlank() ? "" : """
                <tr><td style="padding:20px 32px 0;font-family:%s;font-size:13px;line-height:1.55;color:%s">%s</td></tr>
                """.formatted(POLICE, ENCRE_3, note);

        String blocApercu = apercu == null || apercu.isBlank() ? "" : """
                <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent">%s</div>
                """.formatted(apercu);

        return """
                <!DOCTYPE html>
                <html lang="fr"><head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width,initial-scale=1">
                <meta name="color-scheme" content="light">
                <title>%1$s</title>
                </head>
                <body style="margin:0;padding:0;background:%2$s">
                %3$s
                <table role="presentation" width="100%%" cellpadding="0" cellspacing="0" border="0" bgcolor="%2$s" style="background:%2$s">
                  <tr><td align="center" style="padding:32px 12px 40px">

                    <table role="presentation" width="100%%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px">

                      <!-- En-tête de marque -->
                      <tr><td style="padding:0 8px 22px">
                        <a href="%4$s" target="_blank" style="text-decoration:none">
                          <img src="%5$s" width="180" height="46" alt="BétailMarket"
                               style="display:block;border:0;outline:none;width:180px;height:46px;
                                      font-family:%6$s;font-size:24px;font-weight:700;color:%7$s">
                        </a>
                      </td></tr>

                      <!-- Carte du message -->
                      <tr><td bgcolor="#FFFFFF" style="background:#FFFFFF;border:1px solid %8$s;border-radius:16px;overflow:hidden">
                        <table role="presentation" width="100%%" cellpadding="0" cellspacing="0" border="0">
                          <tr><td height="4" bgcolor="%9$s" style="height:4px;line-height:4px;font-size:0;background:%9$s;border-radius:16px 16px 0 0">&nbsp;</td></tr>
                          <tr><td style="padding:34px 32px 6px;font-family:%6$s;font-size:26px;line-height:1.25;font-weight:700;color:%7$s">%1$s</td></tr>
                          <tr><td style="padding:10px 32px 14px;font-family:%10$s;font-size:15px;line-height:1.65;color:%11$s">%12$s</td></tr>
                          %13$s
                          %14$s
                          <tr><td style="padding:30px 32px 34px;font-family:%10$s;font-size:14px;line-height:1.5;color:%11$s">
                            À très vite,<br><strong style="color:%7$s">L'équipe BétailMarket</strong>
                          </td></tr>
                        </table>
                      </td></tr>

                      <!-- Engagements -->
                      <tr><td style="padding:22px 8px 0;font-family:%10$s;font-size:12px;line-height:1.6;color:%15$s;text-align:center">
                        <span style="color:%9$s">&#10003;</span>&nbsp;Vendeurs vérifiés
                        &nbsp;&nbsp;·&nbsp;&nbsp;<span style="color:%9$s">&#10003;</span>&nbsp;Contrôle vétérinaire
                        &nbsp;&nbsp;·&nbsp;&nbsp;<span style="color:%9$s">&#10003;</span>&nbsp;Paiement protégé jusqu'à la remise
                      </td></tr>

                      <!-- Pied de page -->
                      <tr><td style="padding:14px 8px 0;font-family:%10$s;font-size:12px;line-height:1.6;color:%15$s;text-align:center">
                        BétailMarket — la place de marché de l'élevage en Côte d'Ivoire<br>
                        Vous recevez cet email parce que vous avez un compte sur
                        <a href="%4$s" target="_blank" style="color:%11$s;text-decoration:underline">BétailMarket</a>.
                        Ne partagez jamais vos codes ni votre mot de passe : notre équipe ne vous les demandera pas.
                      </td></tr>
                    </table>

                  </td></tr>
                </table>
                </body></html>
                """.formatted(
                titre,              // 1
                FOND,               // 2
                blocApercu,         // 3
                frontendUrl,        // 4
                logoUrl,            // 5
                POLICE_TITRE,       // 6
                ENCRE,              // 7
                LIGNE,              // 8
                VERT,               // 9
                POLICE,             // 10
                ENCRE_2,            // 11
                corps,              // 12
                bouton,             // 13
                blocNote,           // 14
                ENCRE_3);           // 15
    }

    // ══ Blocs réutilisables dans le corps ═══════════════════════════════════

    /** Encadré d'information (vert) ou d'avertissement (orangé). */
    public static String encadre(String html, boolean avertissement) {
        return """
                <table role="presentation" width="100%%" cellpadding="0" cellspacing="0" border="0" style="margin:18px 0">
                  <tr><td bgcolor="%s" style="background:%s;border:1px solid %s;border-radius:12px;padding:14px 18px;
                       font-size:14px;line-height:1.55;color:%s">%s</td></tr>
                </table>
                """.formatted(
                avertissement ? ORANGE_DOUX : VERT_DOUX,
                avertissement ? ORANGE_DOUX : VERT_DOUX,
                avertissement ? ORANGE_BORD : VERT_BORD,
                avertissement ? ORANGE : VERT_FONCE,
                html);
    }

    /** Le code de remise, en très grand, comme sur le ticket de l'application. */
    public static String code(String code, String legende) {
        return """
                <table role="presentation" width="100%%" cellpadding="0" cellspacing="0" border="0" style="margin:22px 0">
                  <tr><td align="center" bgcolor="%s" style="background:%s;border:1px dashed %s;border-radius:14px;padding:22px 12px">
                    <div style="font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:%s">%s</div>
                    <div style="margin-top:8px;font-family:'SFMono-Regular',Consolas,'Courier New',monospace;font-size:40px;
                                font-weight:700;letter-spacing:14px;color:%s;padding-left:14px">%s</div>
                  </td></tr>
                </table>
                """.formatted(VERT_DOUX, VERT_DOUX, VERT, VERT, legende, VERT_FONCE, code);
    }

    /** Un montant mis en avant, avec sa légende en dessous. */
    public static String montant(String montant, String legende) {
        return """
                <div style="margin:18px 0 4px;font-family:%s;font-size:30px;line-height:1.2;font-weight:700;color:%s">%s</div>
                %s
                """.formatted(POLICE_TITRE, VERT_FONCE, montant,
                legende == null || legende.isBlank() ? ""
                        : "<div style=\"font-size:13px;line-height:1.5;color:" + ENCRE_3 + "\">" + legende + "</div>");
    }

    /** Lien de secours à copier quand le bouton ne s'ouvre pas. */
    public static String lienDeSecours(String lien) {
        return "Le bouton ne fonctionne pas ? Copiez ce lien dans votre navigateur :<br>"
                + "<a href=\"" + lien + "\" style=\"color:" + VERT + ";word-break:break-all\">" + lien + "</a>";
    }
}
