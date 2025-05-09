package com.berksprojects.taskmanagement.services.auth;

import com.berksprojects.taskmanagement.dto.SignupRequest;
import com.berksprojects.taskmanagement.dto.UserDto;
import org.springframework.security.core.userdetails.UserDetails;

public interface AuthService {
    UserDto signupUser(SignupRequest signupRequest);
    boolean hasUserWithEmail(String email);
}