package com.security.ChatApp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.security.ChatApp.model.RoomModel;

@Repository
public interface RoomRepository extends JpaRepository<RoomModel, Long> {
	Optional<RoomModel> findByRoomName(String roomName);

	Boolean existsByRoomName(String roomName);
}
