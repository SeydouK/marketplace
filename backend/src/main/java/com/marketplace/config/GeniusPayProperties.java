package com.marketplace.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "geniuspay")
public class GeniusPayProperties {

    /** Base URL de l'API marchand GeniusPay. */
    private String baseUrl = "https://pay.genius.ci/api/v1/merchant";

    /** Cle d'API (sk_sandbox_... ou sk_live_...), header X-API-Key. */
    private String apiKey;

    /** Secret d'API (ss_sandbox_... ou ss_live_...), header X-API-Secret. Jamais expose au frontend. */
    private String apiSecret;

    /** Secret de signature des webhooks (whsec_...), fourni lors de l'enregistrement du webhook. */
    private String webhookSecret;

    /**
     * Identifiant du wallet marchand (UUID) utilisé comme source des payouts.
     * A recuperer depuis le dashboard GeniusPay une fois le wallet cree/approvisionne.
     * Tant que cette valeur est vide, les envois de versement echoueront proprement
     * (voir GeniusPayService.initiatePayout).
     */
    private String walletId;

    public String getBaseUrl() {
        return baseUrl;
    }

    public void setBaseUrl(String baseUrl) {
        this.baseUrl = baseUrl;
    }

    public String getApiKey() {
        return apiKey;
    }

    public void setApiKey(String apiKey) {
        this.apiKey = apiKey;
    }

    public String getApiSecret() {
        return apiSecret;
    }

    public void setApiSecret(String apiSecret) {
        this.apiSecret = apiSecret;
    }

    public String getWebhookSecret() {
        return webhookSecret;
    }

    public void setWebhookSecret(String webhookSecret) {
        this.webhookSecret = webhookSecret;
    }

    public String getWalletId() {
        return walletId;
    }

    public void setWalletId(String walletId) {
        this.walletId = walletId;
    }
}
