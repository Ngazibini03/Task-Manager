import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrl: './update-task.component.scss'
})
export class UpdateTaskComponent {
  taskUpdateForm!: FormGroup;
  id: number;
  listOfPriorities: any = ["LOW", "MEDIUM", "HIGH"];
  listOfStatus: any = ["PENDING", "INPROGRESS", "COMPLETED", "DEFERRED", "CANCELLED"];
  listOfEmployees: any = [];
  task: any; 

  constructor(private service:AdminService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router:Router) {
    this.id = +this.route.snapshot.params['id'];
    this.getTaskById();
    this.getUsers();
    this.taskUpdateForm = this.fb.group({
      employeeId: [null, [Validators.required]],
      title:[null, [Validators.required]],
      description:[null, [Validators.required]],
      dueDate:[null, [Validators.required]],
      priority:[null, [Validators.required]],
      taskStatus:[null, [Validators.required]]
    })
  }

  getTaskById() {
    this.service.getTaskById(this.id).subscribe((res) => {
      this.taskUpdateForm.patchValue(res);
      console.log(res);
      this.task = res;
    })
  }

  getUsers() {
    this.service.getUser().subscribe((res)=>{
      this.listOfEmployees = res;
      console.log(res);
    })
  }

  updateTask() {
    this.service.updateTasks(this.id, this.taskUpdateForm.value).subscribe((res) => {
      if (res.id !== null) {
        this.snackBar.open("Task posted successfully!", "Close", {duration:5000});
        this.router.navigateByUrl("/admin/dashboard");
      }
      else{
        this.snackBar.open("Something went wrong.", "ERROR", {duration:5000});
      }
    });
  }
}