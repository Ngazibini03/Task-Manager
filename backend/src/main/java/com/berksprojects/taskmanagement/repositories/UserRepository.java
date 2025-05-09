package com.berksprojects.taskmanagement.repositories;

import com.berksprojects.taskmanagement.dto.TaskDto;
import com.berksprojects.taskmanagement.entities.User;
import com.berksprojects.taskmanagement.enums.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findFirstByEmail(String username);

    Optional<User> findByUserRole(UserRole userRole);
}