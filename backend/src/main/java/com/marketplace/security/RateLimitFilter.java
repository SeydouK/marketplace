package com.marketplace.security;

import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.Duration;
import java.util.concurrent.TimeUnit;

@Component
public class RateLimitFilter implements Filter {

    private final Cache<String, Bucket> loginBuckets = Caffeine.newBuilder()
            .expireAfterWrite(1, TimeUnit.HOURS).build();
    private final Cache<String, Bucket> kycBuckets = Caffeine.newBuilder()
            .expireAfterWrite(1, TimeUnit.HOURS).build();

            
    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest  request  = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) res;
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

        chain.doFilter(req, res);
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