package com.marketplace.security;

import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.Duration;
import java.util.concurrent.TimeUnit;

/**
 * Limitation de debit par adresse IP.
 *
 * OncePerRequestFilter, et non un simple Filter : declare comme composant ET
 * ajoute a la chaine de securite, un Filter brut s'executait deux fois par
 * requete et consommait deux jetons — les limites reelles etaient la moitie des
 * limites ecrites.
 */
@Component
public class RateLimitFilter extends OncePerRequestFilter {

    private final Cache<String, Bucket> loginBuckets = Caffeine.newBuilder()
            .expireAfterWrite(1, TimeUnit.HOURS).build();
    private final Cache<String, Bucket> kycBuckets = Caffeine.newBuilder()
            .expireAfterWrite(1, TimeUnit.HOURS).build();
    private final Cache<String, Bucket> motDePasseBuckets = Caffeine.newBuilder()
            .expireAfterWrite(1, TimeUnit.HOURS).build();
    private final Cache<String, Bucket> jetonBuckets = Caffeine.newBuilder()
            .expireAfterWrite(1, TimeUnit.HOURS).build();

            
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        String path = request.getRequestURI();
        String ip   = getClientIp(request);

        if (path.startsWith("/api/auth/login") || path.startsWith("/api/auth/register")) {
            Bucket bucket = loginBuckets.get(ip, k -> Bucket.builder()
                    .addLimit(Bandwidth.builder()
                            .capacity(10)
                            .refillGreedy(10, Duration.ofMinutes(15))
                            .build())
                    .build());
            if (!bucket.tryConsume(1)) {
                sendTooManyRequests(response, "Trop de tentatives. Réessayez dans 15 minutes.");
                return;
            }
        }

        // Mot de passe oublie : seule la demande, qui declenche un email, est
        // serree. Verification et reinitialisation portent un jeton de 256 bits,
        // hors de portee de la force brute ; les limiter autant bloquerait des
        // utilisateurs legitimes qui partagent une IP derriere le NAT d'un
        // operateur mobile.
        if (path.startsWith("/api/auth/mot-de-passe/")) {
            boolean envoiEmail = path.startsWith("/api/auth/mot-de-passe/oublie");
            Cache<String, Bucket> cache = envoiEmail ? motDePasseBuckets : jetonBuckets;
            int capacite = envoiEmail ? 5 : 30;
            Bucket bucket = cache.get(ip, k -> Bucket.builder()
                    .addLimit(Bandwidth.builder()
                            .capacity(capacite)
                            .refillGreedy(capacite, Duration.ofMinutes(15))
                            .build())
                    .build());
            if (!bucket.tryConsume(1)) {
                sendTooManyRequests(response, "Trop de demandes. Réessayez dans 15 minutes.");
                return;
            }
        }

        if (path.startsWith("/api/kyc/")) {
            Bucket bucket = kycBuckets.get(ip, k -> Bucket.builder()
                    .addLimit(Bandwidth.builder()
                            .capacity(5)
                            .refillGreedy(5, Duration.ofHours(1))
                            .build())
                    .build());
            if (!bucket.tryConsume(1)) {
                sendTooManyRequests(response, "Limite KYC atteinte. Réessayez dans 1 heure.");
                return;
            }
        }

        chain.doFilter(request, response);
    }

    private void sendTooManyRequests(HttpServletResponse response, String message) throws IOException {
        response.setStatus(429);
        response.setContentType("application/json;charset=UTF-8");
        response.getWriter().write("{\"error\":\"" + message + "\"}");
    }

    private String getClientIp(HttpServletRequest request) {
        String xff = request.getHeader("X-Forwarded-For");
        if (xff != null && !xff.isEmpty()) return xff.split(",")[0].trim();
        return request.getRemoteAddr();
    }
}