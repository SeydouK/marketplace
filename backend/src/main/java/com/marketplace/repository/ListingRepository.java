package com.marketplace.repository;

import com.marketplace.model.Listing;
import com.marketplace.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface ListingRepository extends JpaRepository<Listing, Long>, JpaSpecificationExecutor<Listing> {
    List<Listing> findByUserOrderByCreatedAtDesc(User user);
    long countByUser(User user);
}
