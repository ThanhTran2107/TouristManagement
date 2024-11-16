package com.app.dto;

import com.app.entities.Role;

public class UpdateRoleRequest {
    private String email;
    private Role role;

    // Constructor mặc định
    public UpdateRoleRequest() {}

    // Getters và Setters
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}