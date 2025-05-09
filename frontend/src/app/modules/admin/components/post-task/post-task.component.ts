import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-task',
  templateUrl: './post-task.component.html',
  styleUrls: ['./post-task.component.scss']
})
export class PostTaskComponent {
  taskForm!: FormGroup;
  listOfEmployees: any[] = [];
  listOfPriorities: string[] = ['LOW', 'MEDIUM', 'HIGH'];
  listOfStatus: string[] = ['PENDING', 'INPROGRESS', 'COMPLETED', 'DEFERRED', 'CANCELLED'];

  constructor(
    private adminService: AdminService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.getUsers();
    this.taskForm = this.fb.group({
      employeeId: [null, [Validators.required]],
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      dueDate: [null, [Validators.required]],
      priority: [null, [Validators.required]],
      taskStatus: [null, [Validators.required]]
    });
  }

  getUsers() {
    this.adminService.getUser().subscribe(
      (res: any) => {
        this.listOfEmployees = res.map((user: any) => ({
          id: user.id,
          name: user.fullName || user.name // Adjust to match your API's structure
        }));
      },
      (err) => {
        console.error('Error fetching employees:', err);
      }
    );
  }

  postTask() {
    this.adminService.postTasks(this.taskForm.value).subscribe(
      (res) => {
        if (res?.id) {
          this.snackBar.open('Task posted successfully!', 'Close', { duration: 5000 });
          this.router.navigateByUrl('/admin/dashboard');
        } else {
          this.snackBar.open('Something went wrong.', 'ERROR', { duration: 5000 });
        }
      },
      (err) => {
        console.error('Error posting task:', err);
      }
    );
  }
}
