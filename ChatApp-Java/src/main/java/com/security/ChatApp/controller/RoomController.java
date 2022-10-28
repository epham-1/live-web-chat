package com.security.ChatApp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.security.ChatApp.Exceptions.NotFoundException;
import com.security.ChatApp.model.RoomModel;
import com.security.ChatApp.service.RoomService;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials = "true")
@RestController
public class RoomController {

	@Autowired
	private RoomService roomService;

	@GetMapping("/test")
	@PreAuthorize("hasRole('USER')")
	public String test() {
		return "TEST";
	}

	@PreAuthorize("hasRole('USER')")
	@GetMapping("/room/find/{roomName}")
	public RoomModel getRoom(@PathVariable("roomName") String roomName) {
		try {
			return roomService.getRoom(roomName);
		} catch (Exception e) {
			throw new NotFoundException("Room Not Found");
		}
	}

	@PreAuthorize("hasRole('USER')")
	@PostMapping("/room/create")
	public RoomModel createRoom(@RequestBody String room) {
		try {
			return roomService.createRoom(room);
		} catch (Exception e) {
			throw e;
		}
	}
}
