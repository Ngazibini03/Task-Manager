package com.berksprojects.taskmanagement.services.employee;

import com.berksprojects.taskmanagement.dto.TaskDto;
import com.berksprojects.taskmanagement.entities.User;
import com.berksprojects.taskmanagement.enums.TaskStatus;
import com.berksprojects.taskmanagement.repositories.TaskRepository;
import com.berksprojects.taskmanagement.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import com.berksprojects.taskmanagement.entities.Task;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    @Override
    public List<TaskDto> getEmployeeTasksById(Long userId) {
        List<Task> tasks = taskRepository.findByUserId(userId);
        return tasks.stream()
                .map(Task::getTaskDto)
                .collect(Collectors.toList());
    }

    @Override
    public Long getCurrentEmployeeId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        Optional<User> optionalUser = userRepository.findFirstByEmail(email);
        return optionalUser.map(User::getId).orElse(null);
    }

    @Override
    public TaskDto getTaskById(Long taskId, Long employeeId) {
        Optional<Task> optionalTask = taskRepository.findByIdAndUserId(taskId, employeeId);
        return optionalTask.map(Task::getTaskDto).orElse(null);
    }

    @Override
    public TaskDto updateTaskStatus(Long id, TaskStatus newStatus) {
        Optional<Task> optionalTask = taskRepository.findById(id);
        if (optionalTask.isPresent()) {
            Task existingTask = optionalTask.get();
            existingTask.setTaskStatus(newStatus);
            return taskRepository.save(existingTask).getTaskDto();
        }
        return null;
    }

    private TaskStatus mapStringToTaskStatus(String status) {
        return switch (status) {
            case "PENDING" -> TaskStatus.PENDING;
            case "INPROGRESS" -> TaskStatus.INPROGRESS;
            case "COMPLETED" -> TaskStatus.COMPLETED;
            case "DEFERRED" -> TaskStatus.DEFERRED;
            default -> TaskStatus.CANCELLED;
        };
    }
    @Override
    public TaskDto getTaskById(Long taskId) {
        Optional<Task> optionalTask = taskRepository.findById(taskId);
        return optionalTask.map(Task::getTaskDto).orElse(null);
    }
}