package com.security.ChatApp.service;

import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.security.ChatApp.Exceptions.AlreadyExistsException;
import com.security.ChatApp.model.RoomModel;
import com.security.ChatApp.repository.RoomRepository;

@Service
public class RoomService {

	private static Logger LOGGER = LoggerFactory.getLogger(RoomService.class);
	@Autowired
	private RoomRepository roomRepository;

	@Transactional
	public RoomModel createRoom(String room) throws AlreadyExistsException {
		if (roomRepository.existsByRoomName(room)) {
			LOGGER.error("Room Already Exists");
			throw new AlreadyExistsException("Room Already Exists");
		}
		RoomModel _room = new RoomModel(room);
		roomRepository.saveAndFlush(_room);
		return _room;
	}

	public boolean doesRoomExist(String roomName) {
		return roomRepository.existsByRoomName(roomName);
	}

	public RoomModel getRoom(String room) throws ClassNotFoundException {
		return roomRepository.findByRoomName(room).orElseThrow(
				() -> new ClassNotFoundException("Room not found"));
	}
}
