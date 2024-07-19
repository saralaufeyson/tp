package com.arjuncodes.studentsystem.exception;

public class StudentNotFoundException extends RuntimeException {

	public StudentNotFoundException(int id) {
		super("Could not find stratergy"+id);
	}
	

}
