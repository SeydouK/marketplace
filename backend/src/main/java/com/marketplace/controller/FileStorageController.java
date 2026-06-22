package com.marketplace.controller;

import com.marketplace.dto.StoredFileDTO;
import com.marketplace.service.FileStorageService;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/files")
public class FileStorageController {

    private final FileStorageService fileStorageService;

    public FileStorageController(FileStorageService fileStorageService) {
        this.fileStorageService = fileStorageService;
    }

    @PostMapping("/upload")
    public ResponseEntity<StoredFileDTO> upload(
            @RequestParam("file") MultipartFile file,
            @RequestParam("category") String category
    ) {
        return ResponseEntity.ok(fileStorageService.store(file, category));
    }

    @GetMapping("/{category}/{filename:.+}")
    public ResponseEntity<Resource> read(@PathVariable String category, @PathVariable String filename) {
        FileStorageService.StoredResource storedResource = fileStorageService.load(category, filename);
        return ResponseEntity.ok()
                .contentType(storedResource.mediaType())
                .header(HttpHeaders.CACHE_CONTROL, "public, max-age=3600")
                .body(storedResource.resource());
    }
}
