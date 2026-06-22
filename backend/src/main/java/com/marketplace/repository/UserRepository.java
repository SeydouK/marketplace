package com.marketplace.repository;

import com.marketplace.model.User;
import com.marketplace.model.KycStatus;
import com.marketplace.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
    Optional<User> findByEmailVerificationToken(String token);
    List<User> findByDevenirVendeurTrueOrderByUpdatedAtDesc();
    Page<User> findByRole(Role role, Pageable pageable);
    Page<User> findByKycStatusIn(List<KycStatus> statuses, Pageable pageable);
    long countByKycStatusIn(List<KycStatus> statuses);
}
