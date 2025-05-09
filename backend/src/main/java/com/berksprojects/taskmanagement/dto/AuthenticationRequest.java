package com.berksprojects.taskmanagement.dto;

import com.berksprojects.taskmanagement.enums.UserRole;
import lombok.Data;

@Data
public class AuthenticationRequest {
    private String email;
    private String password;
}