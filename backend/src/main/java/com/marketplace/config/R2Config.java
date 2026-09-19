package com.marketplace.config;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.S3Configuration;

import java.net.URI;

/**
 * Client S3 pointant vers Cloudflare R2. Instancié uniquement en production
 * (app.storage.provider=r2) ; en local le bean n'existe pas.
 */
@Configuration
@ConditionalOnProperty(name = "app.storage.provider", havingValue = "r2")
public class R2Config {

    @Bean
    public S3Client r2Client(FileStorageProperties properties) {
        FileStorageProperties.R2 r2 = properties.getR2();
        return S3Client.builder()
                .endpointOverride(URI.create(r2.getEndpoint()))
                .region(Region.of(r2.getRegion()))
                .credentialsProvider(StaticCredentialsProvider.create(
                        AwsBasicCredentials.create(r2.getAccessKey(), r2.getSecretKey())))
                // R2 nécessite l'accès "path-style"
                .serviceConfiguration(S3Configuration.builder().pathStyleAccessEnabled(true).build())
                .build();
    }
}
