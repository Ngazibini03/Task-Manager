package com.berksprojects.taskmanagement.services.admin;

import com.berksprojects.taskmanagement.dto.TaskDto;
import com.berksprojects.taskmanagement.dto.UserDto;

import java.util.List;

public interface AdminService {
    List<UserDto> getUsers();

    TaskDto createTask(TaskDto taskDto);

    List<TaskDto> getAllTasks();

    void deleteTask(Long id);

    TaskDto updateTask(Long id, TaskDto taskDto);

    TaskDto getTaskById(Long id);
}