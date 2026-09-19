package com.marketplace.service.storage;

import com.marketplace.exception.ResourceNotFoundException;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.MediaTypeFactory;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.ResponseBytes;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;
import software.amazon.awssdk.services.s3.model.NoSuchKeyException;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;

/**
 * Stockage sur un service compatible S3 — logique commune à Cloudflare R2
 * ({@link R2FileStorageService}) et Backblaze B2 ({@link B2FileStorageService}).
 *
 * Les objets sont stockés sous la clé {@code dossier/nom} et servis par le
 * backend via {@code GET /api/files/...} : le bucket reste privé, aucun
 * changement d'URL côté base ou frontend.
 */
public abstract class S3FileStorageService extends AbstractFileStorageService {

    private final S3Client s3Client;
    private final String bucket;

    protected S3FileStorageService(S3Client s3Client, String bucket) {
        this.s3Client = s3Client;
        this.bucket = bucket;
    }

    @Override
    protected void persist(String directoryName, String storedName, MultipartFile file) {
        String key = directoryName + "/" + storedName;
        try {
            PutObjectRequest request = PutObjectRequest.builder()
                    .bucket(bucket)
                    .key(key)
                    .contentType(file.getContentType())
                    .contentLength(file.getSize())
                    .build();
            s3Client.putObject(request, RequestBody.fromInputStream(file.getInputStream(), file.getSize()));
        } catch (IOException exception) {
            throw new IllegalStateException("Impossible d'envoyer le fichier vers le stockage objet.", exception);
        }
    }

    @Override
    protected StoredResource fetch(String directoryName, String fileName) {
        String key = directoryName + "/" + fileName;
        try {
            ResponseBytes<GetObjectResponse> object = s3Client.getObjectAsBytes(
                    GetObjectRequest.builder().bucket(bucket).key(key).build());

            Resource resource = new ByteArrayResource(object.asByteArray());
            MediaType mediaType = resolveMediaType(object.response().contentType(), fileName);
            return new StoredResource(resource, mediaType);
        } catch (NoSuchKeyException exception) {
            throw new ResourceNotFoundException("Fichier introuvable.");
        }
    }

    @Override
    protected void remove(String directoryName, String fileName) {
        String key = directoryName + "/" + fileName;
        s3Client.deleteObject(DeleteObjectRequest.builder().bucket(bucket).key(key).build());
    }

    private MediaType resolveMediaType(String contentType, String fileName) {
        if (contentType != null && !contentType.isBlank()) {
            try {
                return MediaType.parseMediaType(contentType);
            } catch (RuntimeException ignored) {
                // on retombe sur la détection par nom de fichier
            }
        }
        return MediaTypeFactory.getMediaType(fileName).orElse(MediaType.APPLICATION_OCTET_STREAM);
    }
}
