package com.berksprojects.taskmanagement.services.employee;

import com.berksprojects.taskmanagement.dto.TaskDto;
import com.berksprojects.taskmanagement.enums.TaskStatus;

import java.util.List;

public interface EmployeeService {
    List<TaskDto> getEmployeeTasksById(Long userId);
    Long getCurrentEmployeeId();
    TaskDto updateTaskStatus(Long id, TaskStatus taskStatus);
    TaskDto getTaskById(Long taskId);
    TaskDto getTaskById(Long taskId, Long employeeId);
}