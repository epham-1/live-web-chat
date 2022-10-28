package com.security.ChatApp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;

import com.security.ChatApp.model.ChatMessage;
import com.security.ChatApp.model.ChatMessageDTO;
import com.security.ChatApp.model.Type;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials = "true")
@Controller
public class ChatController {

	@Autowired
	private SimpMessagingTemplate simpMessagingTemplate;

	@MessageMapping("/send-message")
	public ChatMessage globalMessage(@RequestBody ChatMessageDTO message) {
		System.out.println(message.getRoom() + " : " + message.getUsername() + " : "
				+ message.getContent());

		ChatMessage chatMessage = new ChatMessage(message);
		chatMessage.setType(Type.Message);

		simpMessagingTemplate.convertAndSend("/room/" + message.getRoom(), chatMessage);

		return chatMessage;
	}

	@MessageMapping("/join")
	public ChatMessage joinMessage(@RequestBody ChatMessageDTO message) {

		ChatMessage chatMessage = new ChatMessage(message);
		chatMessage.setType(Type.Join);

		simpMessagingTemplate.convertAndSend("/room/" + message.getRoom(), chatMessage);
		return chatMessage;
	}

	@MessageMapping("/leave")
	public ChatMessage leaveMessage(@RequestBody ChatMessageDTO message) {

		ChatMessage chatMessage = new ChatMessage(message);
		chatMessage.setType(Type.Leave);

		simpMessagingTemplate.convertAndSend("/room/" + message.getRoom(), chatMessage);
		return chatMessage;
	}

	@MessageMapping("/ping")
	public ChatMessage pingMessage(@RequestBody ChatMessageDTO message) {

		ChatMessage chatMessage = new ChatMessage(message);
		chatMessage.setType(Type.Ping);

		simpMessagingTemplate.convertAndSend("/room/" + message.getRoom(), chatMessage);
		return chatMessage;
	}
}
