package com.security.ChatApp.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

	@ExceptionHandler({ NotFoundException.class })
	public ResponseEntity<Object> roomNotFound(NotFoundException e, WebRequest webRequest) {
		ExceptionResponse response = new ExceptionResponse();
		response.setErrorCode(HttpStatus.NOT_FOUND);
		response.setErrorMessage(e.getMessage());
		ResponseEntity<Object> entity = new ResponseEntity<>(response,
				HttpStatus.NOT_FOUND);
		return entity;

	}

	@ExceptionHandler({ AlreadyExistsException.class })
	public ResponseEntity<Object> alreadyExistsException(AlreadyExistsException e, WebRequest webRequest) {
		ExceptionResponse response = new ExceptionResponse();
		response.setErrorCode(HttpStatus.CONFLICT);
		response.setErrorMessage(e.getMessage());
		ResponseEntity<Object> entity = new ResponseEntity<>(response,
				HttpStatus.CONFLICT);
		return entity;
	}
}
