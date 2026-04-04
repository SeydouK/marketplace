package com.marketplace.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class StoredFileDTO {
    private String originalName;
    private String storedName;
    private String url;
    private String contentType;
    private long size;
}
