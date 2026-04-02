package com.marketplace.service;

import com.marketplace.dto.CniVerificationResult;
import com.marketplace.dto.KycStatusResponse;
import com.marketplace.model.KycStatus;
import com.marketplace.model.User;
import com.marketplace.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.marketplace.utils.InMemoryMultipartFile;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class KycService {

    private final UserRepository userRepository;
    private final CniVerificationService cniVerificationService;
    private final FaceComparisonService faceComparisonService;

    private static final String UPLOAD_DIR = "uploads/kyc/";

    public KycStatusResponse processCni(MultipartFile file, String email) throws Exception {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));

        // Sauvegarder le fichier
        String cniUrl = saveFile(file, "cni_" + user.getId());
        user.setCniUrl(cniUrl);
        user.setKycStatus(KycStatus.CNI_UPLOADED);
        userRepository.save(user);

        // Vérifier avec Gemini
        CniVerificationResult result = cniVerificationService.verifyCni(file);

        if (!result.estCni() || result.confiance().equals("faible")) {
            user.setKycStatus(KycStatus.REJECTED);
            userRepository.save(user);
            return new KycStatusResponse(
                KycStatus.REJECTED,
                user.isEmailVerified(),
                user.getBadgeVerifie(),
                "Document non reconnu comme une CNI valide : " + result.raison()
            );
        }

        user.setKycStatus(KycStatus.CNI_VERIFIED);
        userRepository.save(user);

        return new KycStatusResponse(
            KycStatus.CNI_VERIFIED,
            user.isEmailVerified(),
            user.getBadgeVerifie(),
            "CNI vérifiée avec succès. Veuillez maintenant prendre un selfie."
        );
    }

    public KycStatusResponse processSelfie(MultipartFile file, String email) throws Exception {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));

        if (user.getKycStatus() != KycStatus.CNI_VERIFIED) {
            throw new RuntimeException("Veuillez d'abord valider votre CNI.");
        }

        // Sauvegarder le selfie
        String selfieUrl = saveFile(file, "selfie_" + user.getId());
        user.setSelfieUrl(selfieUrl);
        userRepository.save(user);

        // Comparer selfie avec CNI via Gemini
        MultipartFile cniFile = loadFileAsMultipart(user.getCniUrl());
        boolean match = faceComparisonService.compareFaces(cniFile, file);

        if (!match) {
            user.setKycStatus(KycStatus.REJECTED);
            userRepository.save(user);
            return new KycStatusResponse(
                KycStatus.REJECTED,
                user.isEmailVerified(),
                user.getBadgeVerifie(),
                "Le selfie ne correspond pas à la photo de la CNI."
            );
        }

        // KYC validé
        user.setKycStatus(KycStatus.VALIDATED);
        user.setBadgeVerifie(true);
        userRepository.save(user);

        return new KycStatusResponse(
            KycStatus.VALIDATED,
            user.isEmailVerified(),
            true,
            "Identité vérifiée avec succès !"
        );
    }

    public KycStatusResponse getStatus(String email) {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));
        return new KycStatusResponse(
            user.getKycStatus(),
            user.isEmailVerified(),
            user.getBadgeVerifie(),
            null
        );
    }

    private String saveFile(MultipartFile file, String prefix) throws IOException {
        Path uploadPath = Paths.get(UPLOAD_DIR);
        if (!Files.exists(uploadPath)) Files.createDirectories(uploadPath);

        String filename = prefix + "_" + UUID.randomUUID() + getExtension(file);
        Path filePath = uploadPath.resolve(filename);
        Files.write(filePath, file.getBytes());
        return filePath.toString();
    }

    private String getExtension(MultipartFile file) {
        String original = file.getOriginalFilename();
        if (original != null && original.contains("."))
            return original.substring(original.lastIndexOf("."));
        return ".jpg";
    }

    private MultipartFile loadFileAsMultipart(String path) throws IOException {
        Path filePath = Paths.get(path);
        byte[] bytes = Files.readAllBytes(filePath);
        // Wrapper simple pour retransformer un fichier sauvegardé en MultipartFile
        return new InMemoryMultipartFile(bytes, filePath.getFileName().toString());
    }
}