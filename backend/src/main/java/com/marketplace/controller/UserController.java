package com.marketplace.controller;

import com.marketplace.dto.AnimalDTO;
import com.marketplace.dto.UserProfileDTO;
import com.marketplace.service.AnimalService;
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
    private final AnimalService animalService;

    public UserController(UserService userService, AnimalService animalService) {
        this.userService = userService;
        this.animalService = animalService;
    }

    @GetMapping("/me")
    public ResponseEntity<UserProfileDTO> me() {
        return ResponseEntity.ok(userService.getCurrentProfile());
    }

    @GetMapping("/me/animals")
    public ResponseEntity<List<AnimalDTO>> myAnimals() {
        return ResponseEntity.ok(animalService.listMyAnimals());
    }
}
