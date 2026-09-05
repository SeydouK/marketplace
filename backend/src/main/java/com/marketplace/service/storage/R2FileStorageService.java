package com.marketplace.service.storage;

import com.marketplace.config.FileStorageProperties;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.s3.S3Client;

/**
 * Stockage sur Cloudflare R2 (API compatible S3). Activé quand
 * {@code app.storage.provider=r2}. Toute la logique d'I/O vit dans
 * {@link S3FileStorageService}.
 */
@Service
@ConditionalOnProperty(name = "app.storage.provider", havingValue = "r2")
public class R2FileStorageService extends S3FileStorageService {

    public R2FileStorageService(@Qualifier("r2Client") S3Client r2Client, FileStorageProperties properties) {
        super(r2Client, properties.getR2().getBucket());
    }
}
