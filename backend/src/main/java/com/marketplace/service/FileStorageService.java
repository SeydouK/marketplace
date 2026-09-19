package com.marketplace.service;

import com.marketplace.dto.StoredFileDTO;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.web.multipart.MultipartFile;

/**
 * Stockage de fichiers. Le backend concret est choisi via la propriété
 * {@code app.storage.provider} :
 *   • local (défaut) : disque, pour le développement ;
 *   • b2             : Backblaze B2 (compatible S3), pour la production ;
 *   • r2             : Cloudflare R2 (compatible S3), variante prod.
 *
 * L'URL retournée reste toujours de la forme {@code /api/files/{dossier}/{nom}}
 * afin que le contrôleur, la base de données et le frontend soient agnostiques
 * du backend de stockage.
 */
public interface FileStorageService {

    StoredFileDTO store(MultipartFile file, String categoryKey);

    StoredResource load(String directoryName, String fileName);

    void deleteByUrl(String fileUrl);

    record StoredResource(Resource resource, MediaType mediaType) {
    }
}
