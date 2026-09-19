package com.marketplace.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "app.storage")
public class FileStorageProperties {

    /** Backend de stockage : "local" (défaut, disque) ou "r2" (Cloudflare R2). */
    private String provider = "local";

    /** Dossier racine pour le stockage local. */
    private String baseDir;

    /** Paramètres Cloudflare R2 (utilisés uniquement si provider=r2). */
    private final R2 r2 = new R2();

    /** Paramètres Backblaze B2 (utilisés uniquement si provider=b2). */
    private final B2 b2 = new B2();

    public String getProvider() {
        return provider;
    }

    public void setProvider(String provider) {
        this.provider = provider;
    }

    public String getBaseDir() {
        return baseDir;
    }

    public void setBaseDir(String baseDir) {
        this.baseDir = baseDir;
    }

    public R2 getR2() {
        return r2;
    }

    public B2 getB2() {
        return b2;
    }

    public static class R2 {
        /** Endpoint S3 du compte R2 : https://<account_id>.r2.cloudflarestorage.com */
        private String endpoint;
        private String bucket;
        private String accessKey;
        private String secretKey;
        /** Région : R2 attend "auto". */
        private String region = "auto";

        public String getEndpoint() {
            return endpoint;
        }

        public void setEndpoint(String endpoint) {
            this.endpoint = endpoint;
        }

        public String getBucket() {
            return bucket;
        }

        public void setBucket(String bucket) {
            this.bucket = bucket;
        }

        public String getAccessKey() {
            return accessKey;
        }

        public void setAccessKey(String accessKey) {
            this.accessKey = accessKey;
        }

        public String getSecretKey() {
            return secretKey;
        }

        public void setSecretKey(String secretKey) {
            this.secretKey = secretKey;
        }

        public String getRegion() {
            return region;
        }

        public void setRegion(String region) {
            this.region = region;
        }
    }

    public static class B2 {
        /** Endpoint S3 du bucket B2 : https://s3.<region>.backblazeb2.com */
        private String endpoint;
        private String bucket;
        private String accessKey;
        private String secretKey;
        /** Région B2, p.ex. "us-west-004" (doit correspondre à l'endpoint). */
        private String region;

        public String getEndpoint() {
            return endpoint;
        }

        public void setEndpoint(String endpoint) {
            this.endpoint = endpoint;
        }

        public String getBucket() {
            return bucket;
        }

        public void setBucket(String bucket) {
            this.bucket = bucket;
        }

        public String getAccessKey() {
            return accessKey;
        }

        public void setAccessKey(String accessKey) {
            this.accessKey = accessKey;
        }

        public String getSecretKey() {
            return secretKey;
        }

        public void setSecretKey(String secretKey) {
            this.secretKey = secretKey;
        }

        public String getRegion() {
            return region;
        }

        public void setRegion(String region) {
            this.region = region;
        }
    }
}
