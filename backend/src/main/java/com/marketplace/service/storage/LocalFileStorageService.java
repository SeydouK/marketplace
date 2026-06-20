package com.marketplace.service.storage;

import com.marketplace.config.FileStorageProperties;
import com.marketplace.exception.ResourceNotFoundException;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.MediaTypeFactory;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

/**
 * Stockage sur disque local — utilisé en développement (défaut).
 * Activé quand {@code app.storage.provider} vaut {@code local} ou est absent.
 */
@Service
@ConditionalOnProperty(name = "app.storage.provider", havingValue = "local", matchIfMissing = true)
public class LocalFileStorageService extends AbstractFileStorageService {

    private final Path storageRoot;

    public LocalFileStorageService(FileStorageProperties properties) {
        if (!StringUtils.hasText(properties.getBaseDir())) {
            throw new IllegalStateException("Le dossier de stockage (app.storage.base-dir) n'est pas configure.");
        }
        this.storageRoot = Paths.get(properties.getBaseDir()).toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.storageRoot);
        } catch (IOException exception) {
            throw new IllegalStateException("Impossible de creer le dossier de stockage local.", exception);
        }
    }

    @Override
    protected void persist(String directoryName, String storedName, MultipartFile file) {
        Path targetDirectory = storageRoot.resolve(directoryName).normalize();
        try {
            Files.createDirectories(targetDirectory);
            Path targetFile = targetDirectory.resolve(storedName).normalize();
            if (!targetFile.startsWith(targetDirectory)) {
                throw new IllegalStateException("Le chemin du fichier est invalide.");
            }
            try (InputStream fileStream = file.getInputStream()) {
                Files.copy(fileStream, targetFile, StandardCopyOption.REPLACE_EXISTING);
            }
        } catch (IOException exception) {
            throw new IllegalStateException("Impossible de stocker le fichier sur le disque local.", exception);
        }
    }

    @Override
    protected StoredResource fetch(String directoryName, String fileName) {
        Path directoryPath = storageRoot.resolve(directoryName).normalize();
        Path filePath = directoryPath.resolve(fileName).normalize();

        if (!filePath.startsWith(directoryPath)) {
            throw new ResourceNotFoundException("Fichier introuvable.");
        }

        try {
            if (!Files.exists(filePath) || !Files.isReadable(filePath)) {
                throw new ResourceNotFoundException("Fichier introuvable.");
            }
            Resource resource = new UrlResource(filePath.toUri());
            MediaType mediaType = MediaTypeFactory.getMediaType(resource)
                    .orElse(MediaType.APPLICATION_OCTET_STREAM);
            return new StoredResource(resource, mediaType);
        } catch (MalformedURLException exception) {
            throw new ResourceNotFoundException("Fichier introuvable.");
        }
    }

    @Override
    protected void remove(String directoryName, String fileName) {
        Path directoryPath = storageRoot.resolve(directoryName).normalize();
        Path filePath = directoryPath.resolve(fileName).normalize();
        if (!filePath.startsWith(directoryPath)) {
            throw new IllegalStateException("Le chemin du fichier est invalide.");
        }
        try {
            Files.deleteIfExists(filePath);
        } catch (IOException exception) {
            throw new IllegalStateException("Impossible de supprimer le fichier du disque local.", exception);
        }
    }
}
