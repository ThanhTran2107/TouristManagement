package com.app.dto;

public class DeleteUserRequest {
    private String email;
    
    public DeleteUserRequest() {}

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}