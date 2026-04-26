package com.marketplace.controller;

import com.marketplace.dto.SellerRequestDTO;
import com.marketplace.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin/seller-requests")
public class AdminController {

    private final UserService userService;

    public AdminController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<SellerRequestDTO>> listSellerRequests() {
        return ResponseEntity.ok(userService.listPendingSellerRequests());
    }

    @PostMapping("/{userId}/approve")
    public ResponseEntity<SellerRequestDTO> approveSellerRequest(@PathVariable Long userId) {
        return ResponseEntity.ok(userService.approveSellerRequest(userId));
    }
}
