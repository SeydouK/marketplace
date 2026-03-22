package com.marketplace.controller;

import com.marketplace.dto.ListingDTO;
import com.marketplace.dto.UserProfileDTO;
import com.marketplace.service.ListingService;
import com.marketplace.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final ListingService listingService;

    public UserController(UserService userService, ListingService listingService) {
        this.userService = userService;
        this.listingService = listingService;
    }

    @GetMapping("/me")
    public ResponseEntity<UserProfileDTO> me() {
        return ResponseEntity.ok(userService.getCurrentProfile());
    }

    @GetMapping("/me/listings")
    public ResponseEntity<List<ListingDTO>> myListings() {
        return ResponseEntity.ok(listingService.getMyListings());
    }
}
