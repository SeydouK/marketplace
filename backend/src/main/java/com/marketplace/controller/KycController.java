package com.marketplace.controller;

import com.marketplace.dto.KycStatusResponse;
import com.marketplace.service.KycService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/kyc")
@RequiredArgsConstructor
public class KycController {

    private final KycService kycService;

    @PostMapping(value = "/upload-cni", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<KycStatusResponse> uploadCni(
            @RequestParam("file") MultipartFile file,
            @AuthenticationPrincipal UserDetails userDetails) throws Exception {
        return ResponseEntity.ok(kycService.processCni(file, userDetails.getUsername()));
    }

    @PostMapping(value = "/upload-selfie", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<KycStatusResponse> uploadSelfie(
            @RequestParam("file") MultipartFile file,
            @AuthenticationPrincipal UserDetails userDetails) throws Exception {
        return ResponseEntity.ok(kycService.processSelfie(file, userDetails.getUsername()));
    }

    @GetMapping("/status")
    public ResponseEntity<KycStatusResponse> getStatus(
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(kycService.getStatus(userDetails.getUsername()));
    }
}