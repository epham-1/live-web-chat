package com.security.ChatApp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.security.ChatApp.model.UserModel;

@Repository
public interface UserRepository extends JpaRepository<UserModel, Long> {
	Optional<UserModel> findByUsername(String username);

	Boolean existsByUsername(String username);
}
