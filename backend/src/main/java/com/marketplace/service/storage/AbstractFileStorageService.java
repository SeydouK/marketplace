package com.marketplace.service.storage;

import com.marketplace.dto.StoredFileDTO;
import com.marketplace.exception.BadRequestException;
import com.marketplace.exception.ResourceNotFoundException;
import com.marketplace.service.FileStorageService;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.time.Instant;
import java.util.Locale;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

/**
 * Logique commune à tous les backends de stockage : validation (taille + type
 * réel via magic bytes), mapping des catégories vers des dossiers, génération
 * de nom de fichier et analyse des URLs {@code /api/files/...}.
 *
 * Les implémentations concrètes (disque, R2) ne fournissent que les primitives
 * d'I/O ({@link #persist}, {@link #fetch}, {@link #remove}).
 */
public abstract class AbstractFileStorageService implements FileStorageService {

    private static final Map<String, String> CATEGORY_DIRECTORIES = Map.of(
            "ANIMAL_PHOTO", "animal-photo",
            "ANIMAL_VIDEO", "animal-video",
            "SANITARY_DOCUMENT", "sanitary-document",
            "AVATARS", "avatar"
    );

    private static final Map<String, Set<String>> ALLOWED_MIME_TYPES = Map.of(
            "ANIMAL_PHOTO",      Set.of("image/jpeg", "image/png", "image/webp"),
            "ANIMAL_VIDEO",      Set.of("video/mp4", "video/quicktime"),
            "SANITARY_DOCUMENT", Set.of("application/pdf", "image/jpeg", "image/png"),
            "AVATARS",           Set.of("image/jpeg", "image/png", "image/webp")
    );

    private static final Map<String, Long> MAX_FILE_SIZES = Map.of(
            "ANIMAL_PHOTO",      5  * 1024 * 1024L,
            "ANIMAL_VIDEO",      50 * 1024 * 1024L,
            "SANITARY_DOCUMENT", 10 * 1024 * 1024L,
            "AVATARS",           5  * 1024 * 1024L
    );

    private static final String URL_PREFIX = "/api/files/";

    // ── API publique (commune) ───────────────────────────────────────────────

    @Override
    public StoredFileDTO store(MultipartFile file, String categoryKey) {
        if (file == null || file.isEmpty()) {
            throw new BadRequestException("Aucun fichier n'a ete fourni.");
        }

        String normalizedKey = categoryKey != null ? categoryKey.trim().toUpperCase(Locale.ROOT) : "";

        Long maxSize = MAX_FILE_SIZES.get(normalizedKey);
        if (maxSize != null && file.getSize() > maxSize) {
            throw new BadRequestException("Fichier trop volumineux (max " + (maxSize / 1024 / 1024) + " MB).");
        }

        Set<String> allowedTypes = ALLOWED_MIME_TYPES.get(normalizedKey);
        if (allowedTypes != null) {
            String detectedMime = detectMimeFromMagicBytes(file);
            if (!allowedTypes.contains(detectedMime)) {
                throw new BadRequestException("Type de fichier non autorise : " + detectedMime);
            }
        }

        String directoryName = resolveUploadDirectory(categoryKey);
        String storedName = buildStoredName(file.getOriginalFilename());

        persist(directoryName, storedName, file);

        return new StoredFileDTO(
                file.getOriginalFilename(),
                storedName,
                URL_PREFIX + directoryName + "/" + storedName,
                file.getContentType(),
                file.getSize()
        );
    }

    @Override
    public StoredResource load(String directoryName, String fileName) {
        String safeDirectory = resolveReadDirectory(directoryName);
        if (fileName == null || fileName.contains("/") || fileName.contains("\\") || fileName.contains("..")) {
            throw new ResourceNotFoundException("Fichier introuvable.");
        }
        return fetch(safeDirectory, fileName);
    }

    @Override
    public void deleteByUrl(String fileUrl) {
        if (!StringUtils.hasText(fileUrl)) {
            return;
        }
        ResolvedFile resolved = resolveStoredFile(fileUrl);
        remove(resolved.directoryName(), resolved.fileName());
    }

    // ── Primitives à implémenter par chaque backend ──────────────────────────

    /** Écrit le contenu du fichier sous la clé {@code directoryName/storedName}. */
    protected abstract void persist(String directoryName, String storedName, MultipartFile file);

    /** Lit la ressource {@code directoryName/fileName} (404 si absente). */
    protected abstract StoredResource fetch(String directoryName, String fileName);

    /** Supprime l'objet {@code directoryName/fileName} (sans échouer s'il n'existe pas). */
    protected abstract void remove(String directoryName, String fileName);

    // ── Helpers partagés ─────────────────────────────────────────────────────

    private String detectMimeFromMagicBytes(MultipartFile file) {
        try {
            byte[] header = new byte[Math.min(12, (int) file.getSize())];
            System.arraycopy(file.getBytes(), 0, header, 0, header.length);
            int read = header.length;

            if (read < 4) return "application/octet-stream";

            if ((header[0] & 0xFF) == 0xFF && (header[1] & 0xFF) == 0xD8 && (header[2] & 0xFF) == 0xFF)
                return "image/jpeg";
            if ((header[0] & 0xFF) == 0x89 && header[1] == 0x50 && header[2] == 0x4E && header[3] == 0x47)
                return "image/png";
            if (read >= 12 && header[0] == 'R' && header[1] == 'I' && header[2] == 'F' && header[3] == 'F'
                    && header[8] == 'W' && header[9] == 'E' && header[10] == 'B' && header[11] == 'P')
                return "image/webp";
            if (read >= 8 && header[4] == 'f' && header[5] == 't' && header[6] == 'y' && header[7] == 'p')
                return "video/mp4";
            if (header[0] == 0x25 && header[1] == 0x50 && header[2] == 0x44 && header[3] == 0x46)
                return "application/pdf";

            return "application/octet-stream";
        } catch (IOException e) {
            throw new BadRequestException("Impossible de lire le fichier pour validation.");
        }
    }

    protected String resolveUploadDirectory(String categoryKey) {
        if (!StringUtils.hasText(categoryKey)) {
            throw new BadRequestException("La categorie de stockage est requise.");
        }
        String normalizedKey = categoryKey.trim().toUpperCase(Locale.ROOT);
        String directoryName = CATEGORY_DIRECTORIES.get(normalizedKey);
        if (directoryName == null) {
            throw new BadRequestException("Categorie de stockage non supportee.");
        }
        return directoryName;
    }

    protected String resolveReadDirectory(String directoryName) {
        if (!StringUtils.hasText(directoryName) || !CATEGORY_DIRECTORIES.containsValue(directoryName)) {
            throw new ResourceNotFoundException("Fichier introuvable.");
        }
        return directoryName;
    }

    private ResolvedFile resolveStoredFile(String fileUrl) {
        String normalizedPath = normalizeStoredFilePath(fileUrl);

        if (!normalizedPath.startsWith(URL_PREFIX)) {
            throw new BadRequestException("Le fichier ne correspond pas au stockage applicatif.");
        }

        String relativePath = normalizedPath.substring(URL_PREFIX.length());
        int separatorIndex = relativePath.indexOf('/');
        if (separatorIndex <= 0 || separatorIndex >= relativePath.length() - 1) {
            throw new BadRequestException("Le chemin du fichier est invalide.");
        }

        String directoryName = resolveReadDirectory(relativePath.substring(0, separatorIndex));
        String fileName = relativePath.substring(separatorIndex + 1);

        if (!StringUtils.hasText(fileName)) {
            throw new BadRequestException("Le chemin du fichier est invalide.");
        }

        return new ResolvedFile(directoryName, fileName);
    }

    private String normalizeStoredFilePath(String fileUrl) {
        String candidate = fileUrl.trim();
        if (candidate.startsWith("http://") || candidate.startsWith("https://")) {
            candidate = URI.create(candidate).getPath();
        }
        if (!candidate.startsWith("/")) {
            candidate = "/" + candidate;
        }
        return candidate;
    }

    private String buildStoredName(String originalFilename) {
        String filename = StringUtils.hasText(originalFilename) ? originalFilename : "document";
        String extension = StringUtils.getFilenameExtension(filename);
        String baseName = StringUtils.stripFilenameExtension(filename);
        String safeBaseName = baseName
                .toLowerCase(Locale.ROOT)
                .replaceAll("[^a-z0-9]+", "-")
                .replaceAll("(^-|-$)", "");

        if (!StringUtils.hasText(safeBaseName)) {
            safeBaseName = "fichier";
        }

        String timestamp = String.valueOf(Instant.now().toEpochMilli());
        String suffix = UUID.randomUUID().toString().substring(0, 8);

        if (!StringUtils.hasText(extension)) {
            return safeBaseName + "-" + timestamp + "-" + suffix;
        }
        return safeBaseName + "-" + timestamp + "-" + suffix + "." + extension.toLowerCase(Locale.ROOT);
    }

    protected record ResolvedFile(String directoryName, String fileName) {
    }
}
