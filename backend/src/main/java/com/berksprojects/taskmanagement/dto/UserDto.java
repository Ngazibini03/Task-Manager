package com.berksprojects.taskmanagement.dto;

import com.berksprojects.taskmanagement.entities.User;
import com.berksprojects.taskmanagement.enums.UserRole;
import lombok.Data;

@Data
public class UserDto {
    private Long id;
    private String name;
    private String email;
    private String password;
    private UserRole userRole;
}