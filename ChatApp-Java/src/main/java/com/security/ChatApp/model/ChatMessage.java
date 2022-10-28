package com.security.ChatApp.model;

public class ChatMessage {
	String content;
	String username;
	String room;
	Type type;

	public ChatMessage(ChatMessageDTO message) {
		setContent(message.getContent());
		setRoom(message.getRoom());
		setUsername(message.getUsername());
	}

	public ChatMessage() {
	}

	public Type getType() {
		return type;
	}

	public void setType(Type type) {
		this.type = type;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getRoom() {
		return room;
	}

	public void setRoom(String room) {
		this.room = room;
	}

}
