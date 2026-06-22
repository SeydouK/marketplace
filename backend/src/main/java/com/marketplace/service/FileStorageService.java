package com.marketplace.service;

import com.marketplace.config.FileStorageProperties;
import com.marketplace.dto.StoredFileDTO;
import com.marketplace.exception.BadRequestException;
import com.marketplace.exception.ResourceNotFoundException;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.MediaTypeFactory;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.Set;
import java.io.IOException;
import java.net.URI;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.Instant;
import java.util.Locale;
import java.util.Map;
import java.util.UUID;

@Service
public class FileStorageService {

    private static final Map<String, String> CATEGORY_DIRECTORIES = Map.of(
            "ANIMAL_PHOTO", "animal-photo",
            "ANIMAL_VIDEO", "animal-video",
            "SANITARY_DOCUMENT", "sanitary-document"
    );

    private static final Map<String, Set<String>> ALLOWED_MIME_TYPES = Map.of(
        "ANIMAL_PHOTO",      Set.of("image/jpeg", "image/png", "image/webp"),
        "ANIMAL_VIDEO",      Set.of("video/mp4", "video/quicktime"),
        "SANITARY_DOCUMENT", Set.of("application/pdf", "image/jpeg", "image/png")
    );
    
    private static final Map<String, Long> MAX_FILE_SIZES = Map.of(
        "ANIMAL_PHOTO",      5  * 1024 * 1024L,  
        "ANIMAL_VIDEO",      50 * 1024 * 1024L,  
        "SANITARY_DOCUMENT", 10 * 1024 * 1024L   
    );

    private final Path storageRoot;

    public FileStorageService(FileStorageProperties properties) {
        if (!StringUtils.hasText(properties.getBaseDir())) {
            throw new IllegalStateException("Le dossier de stockage n'est pas configure.");
        }

        this.storageRoot = Paths.get(properties.getBaseDir()).toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.storageRoot);
        } catch (IOException exception) {
            throw new IllegalStateException("Impossible de creer le dossier de stockage local.", exception);
        }
    }

    public StoredFileDTO store(MultipartFile file, String categoryKey) {
        if (file == null || file.isEmpty()) {
            throw new BadRequestException("Aucun fichier n'a ete fourni.");
        }
    
        String normalizedKey = categoryKey != null ? categoryKey.trim().toUpperCase(Locale.ROOT) : "";
    
        // --- NOUVEAU : validation taille ---
        Long maxSize = MAX_FILE_SIZES.get(normalizedKey);
        if (maxSize != null && file.getSize() > maxSize) {
            throw new BadRequestException("Fichier trop volumineux (max " + (maxSize / 1024 / 1024) + " MB).");
        }
    
        // --- NOUVEAU : validation MIME via magic bytes ---
        Set<String> allowedTypes = ALLOWED_MIME_TYPES.get(normalizedKey);
        if (allowedTypes != null) {
            String detectedMime = detectMimeFromMagicBytes(file);
            if (!allowedTypes.contains(detectedMime)) {
                throw new BadRequestException("Type de fichier non autorise : " + detectedMime);
            }
        }
    
        String directoryName = resolveUploadDirectory(categoryKey);
        Path targetDirectory = storageRoot.resolve(directoryName).normalize();
    
        try {
            Files.createDirectories(targetDirectory);
            String storedName = buildStoredName(file.getOriginalFilename());
            Path targetFile = targetDirectory.resolve(storedName).normalize();
            if (!targetFile.startsWith(targetDirectory)) {
                throw new BadRequestException("Le chemin du fichier est invalide.");
            }
    
            try (InputStream fileStream = file.getInputStream()) {
                Files.copy(fileStream, targetFile, StandardCopyOption.REPLACE_EXISTING);
            }
    
            return new StoredFileDTO(
                    file.getOriginalFilename(),
                    storedName,
                    "/api/files/" + directoryName + "/" + storedName,
                    file.getContentType(),
                    file.getSize()
            );
        } catch (IOException exception) {
            throw new IllegalStateException("Impossible de stocker le fichier sur le disque local.", exception);
        }
    }

    private String detectMimeFromMagicBytes(MultipartFile file) {
        try {
            byte[] header = new byte[Math.min(12, (int) file.getSize())];
            System.arraycopy(file.getBytes(), 0, header, 0, header.length);
            int read = header.length;

            if (read < 4) return "application/octet-stream";
    
            // JPEG : FF D8 FF
            if ((header[0] & 0xFF) == 0xFF && (header[1] & 0xFF) == 0xD8 && (header[2] & 0xFF) == 0xFF)
                return "image/jpeg";
            // PNG : 89 50 4E 47
            if ((header[0] & 0xFF) == 0x89 && header[1] == 0x50 && header[2] == 0x4E && header[3] == 0x47)
                return "image/png";
            // WebP : RIFF????WEBP
            if (read >= 12 && header[0]=='R' && header[1]=='I' && header[2]=='F' && header[3]=='F'
                    && header[8]=='W' && header[9]=='E' && header[10]=='B' && header[11]=='P')
                return "image/webp";
            // MP4 / MOV : vérification simplifiée sur ftyp box
            if (read >= 8 && header[4]=='f' && header[5]=='t' && header[6]=='y' && header[7]=='p')
                return "video/mp4";
            // PDF : %PDF
            if (header[0]==0x25 && header[1]==0x50 && header[2]==0x44 && header[3]==0x46)
                return "application/pdf";
    
            return "application/octet-stream";
        } catch (IOException e) {
            throw new BadRequestException("Impossible de lire le fichier pour validation.");
        }
    }

    public StoredResource load(String directoryName, String fileName) {
        String safeDirectory = resolveReadDirectory(directoryName);
        Path directoryPath = storageRoot.resolve(safeDirectory).normalize();
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

    public void deleteByUrl(String fileUrl) {
        if (!StringUtils.hasText(fileUrl)) {
            return;
        }

        ResolvedFile resolvedFile = resolveStoredFile(fileUrl);
        Path directoryPath = storageRoot.resolve(resolvedFile.directoryName()).normalize();
        Path filePath = directoryPath.resolve(resolvedFile.fileName()).normalize();

        if (!filePath.startsWith(directoryPath)) {
            throw new BadRequestException("Le chemin du fichier est invalide.");
        }

        try {
            Files.deleteIfExists(filePath);
        } catch (IOException exception) {
            throw new IllegalStateException("Impossible de supprimer le fichier du disque local.", exception);
        }
    }

    private String resolveUploadDirectory(String categoryKey) {
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

    private String resolveReadDirectory(String directoryName) {
        if (!StringUtils.hasText(directoryName) || !CATEGORY_DIRECTORIES.containsValue(directoryName)) {
            throw new ResourceNotFoundException("Fichier introuvable.");
        }
        return directoryName;
    }

    private ResolvedFile resolveStoredFile(String fileUrl) {
        String normalizedPath = normalizeStoredFilePath(fileUrl);
        String prefix = "/api/files/";

        if (!normalizedPath.startsWith(prefix)) {
            throw new BadRequestException("Le fichier ne correspond pas au stockage applicatif.");
        }

        String relativePath = normalizedPath.substring(prefix.length());
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

    public record StoredResource(Resource resource, MediaType mediaType) {
    }

    private record ResolvedFile(String directoryName, String fileName) {
    }
}
