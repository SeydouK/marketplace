package com.marketplace.utils;

import org.springframework.web.multipart.MultipartFile;
import java.io.*;

public class InMemoryMultipartFile implements MultipartFile {
    private final byte[] content;
    private final String filename;

    public InMemoryMultipartFile(byte[] content, String filename) {
        this.content = content;
        this.filename = filename;
    }

    @Override public String getName() { return filename; }
    @Override public String getOriginalFilename() { return filename; }
    @Override public String getContentType() { return "image/jpeg"; }
    @Override public boolean isEmpty() { return content.length == 0; }
    @Override public long getSize() { return content.length; }
    @Override public byte[] getBytes() { return content; }
    @Override public InputStream getInputStream() { return new ByteArrayInputStream(content); }
    @Override public void transferTo(File dest) throws IOException {
        new FileOutputStream(dest).write(content);
    }
}