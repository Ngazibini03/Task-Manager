package com.berksprojects.taskmanagement.dto;

import com.berksprojects.taskmanagement.enums.UserRole;
import lombok.Data;

@Data
public class AuthenticationResponse {
    private String jwt;
    private Long userId;
    private UserRole userRole;
}