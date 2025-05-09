package com.berksprojects.taskmanagement.services.auth;

import com.berksprojects.taskmanagement.dto.SignupRequest;
import com.berksprojects.taskmanagement.dto.UserDto;
import com.berksprojects.taskmanagement.entities.User;
import com.berksprojects.taskmanagement.enums.UserRole;
import com.berksprojects.taskmanagement.repositories.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(); // Best practice: Use this as a bean in configuration

    @PostConstruct
    public void createAnAdminAccount() {
        Optional<User> optionalUser = userRepository.findByUserRole(UserRole.ADMIN);

        if (optionalUser.isEmpty()) {
            User user = new User();
            user.setEmail("Benvollens@gmail.com");
            user.setName("admin");
            user.setPassword(passwordEncoder.encode("Benvollens"));
            user.setUserRole(UserRole.ADMIN);
            userRepository.save(user);
            System.out.println("Admin account created successfully!");
        } else {
            System.out.println("Admin account already exists.");
        }
    }

    @Override
    public UserDto signupUser(SignupRequest signupRequest) {
        // Validate Password Length
        if (signupRequest.getPassword() == null || signupRequest.getPassword().length() < 6) {
            throw new IllegalArgumentException("Password must be at least 6 characters long.");
        }

        // Check if Email is Already Taken
        if (hasUserWithEmail(signupRequest.getEmail())) {
            throw new IllegalArgumentException("Email is already in use.");
        }

        User user = new User();
        user.setEmail(signupRequest.getEmail());
        user.setName(signupRequest.getName());
        user.setPassword(passwordEncoder.encode(signupRequest.getPassword()));
        user.setUserRole(UserRole.EMPLOYEE);

        User userCreated = userRepository.save(user);
        return userCreated.getUserDto();
    }

    @Override
    public boolean hasUserWithEmail(String email) {
        return userRepository.findFirstByEmail(email).isPresent();
    }
}
