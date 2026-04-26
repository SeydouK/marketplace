package com.marketplace.controller;

import com.marketplace.dto.AdminRejectKycRequest;
import com.marketplace.dto.AdminListingDTO;
import com.marketplace.dto.AdminListingPageDTO;
import com.marketplace.dto.AdminStatsDTO;
import com.marketplace.dto.AdminUpdateRoleRequest;
import com.marketplace.dto.AdminUserDTO;
import com.marketplace.dto.AdminUserPageDTO;
import com.marketplace.dto.SellerRequestDTO;
import com.marketplace.model.AnimalStatus;
import com.marketplace.service.AnimalService;
import com.marketplace.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final UserService userService;
    private final AnimalService animalService;

    public AdminController(UserService userService, AnimalService animalService) {
        this.userService = userService;
        this.animalService = animalService;
    }

    @GetMapping("/stats")
    public ResponseEntity<AdminStatsDTO> stats() {
        return ResponseEntity.ok(userService.getAdminStats());
    }

    @GetMapping("/users")
    public ResponseEntity<AdminUserPageDTO> listUsers(
            @RequestParam(defaultValue = "all") String filter,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        return ResponseEntity.ok(userService.listUsers(filter, page, size));
    }

    @PatchMapping("/users/{userId}/role")
    public ResponseEntity<AdminUserDTO> updateUserRole(
            @PathVariable Long userId,
            @Valid @RequestBody AdminUpdateRoleRequest request
    ) {
        return ResponseEntity.ok(userService.updateUserRole(userId, request.role()));
    }

    @PostMapping("/users/{userId}/kyc/validate")
    public ResponseEntity<AdminUserDTO> validateKyc(@PathVariable Long userId) {
        return ResponseEntity.ok(userService.validateKyc(userId));
    }

    @PostMapping("/users/{userId}/kyc/reject")
    public ResponseEntity<AdminUserDTO> rejectKyc(
            @PathVariable Long userId,
            @RequestBody(required = false) AdminRejectKycRequest request
    ) {
        return ResponseEntity.ok(userService.rejectKyc(userId));
    }

    @GetMapping("/annonces")
    public ResponseEntity<AdminListingPageDTO> listListings(
            @RequestParam(required = false) AnimalStatus status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        return ResponseEntity.ok(animalService.listAdminListings(status, page, size));
    }

    @PostMapping("/annonces/{animalId}/approuver")
    public ResponseEntity<AdminListingDTO> approveListing(@PathVariable UUID animalId) {
        return ResponseEntity.ok(animalService.publishAdminListing(animalId));
    }

    @PostMapping("/annonces/{animalId}/suspendre")
    public ResponseEntity<AdminListingDTO> suspendListing(@PathVariable UUID animalId) {
        return ResponseEntity.ok(animalService.suspendAdminListing(animalId));
    }

    @GetMapping("/seller-requests")
    public ResponseEntity<List<SellerRequestDTO>> listSellerRequests() {
        return ResponseEntity.ok(userService.listPendingSellerRequests());
    }

    @PostMapping("/seller-requests/{userId}/approve")
    public ResponseEntity<SellerRequestDTO> approveSellerRequest(@PathVariable Long userId) {
        return ResponseEntity.ok(userService.approveSellerRequest(userId));
    }
}
