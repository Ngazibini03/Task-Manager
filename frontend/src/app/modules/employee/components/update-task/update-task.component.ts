import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.scss']
})
export class UpdateTaskComponent {
  employeeTaskUpdateForm!: FormGroup;
  id: number;
  listOfStatus: string[] = ["PENDING", "INPROGRESS", "COMPLETED", "DEFERRED", "CANCELLED"];
  task : any;
  constructor(private service: EmployeeService,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private snackBar: MatSnackBar,
              private router: Router) {
    this.id = +this.route.snapshot.params['id'];
    this.employeeTaskUpdateForm = this.fb.group({
      status: [null, [Validators.required]]
    });
    this.getTaskById();
  }

  getTaskById() {
    this.service.getTaskById(this.id).subscribe((res) => {
      console.log(res);
      this.task = res;
    })
  }

  updateTaskStatus() {
  const statusControl = this.employeeTaskUpdateForm.get('status');
  if (statusControl) {
    const status = statusControl.value;
    this.service.updateTaskStatus(this.id, status).subscribe((res) => {
      if (res.id !== null) {
        this.snackBar.open("Status updated successfully!", "Close", { duration: 5000 });
        this.router.navigateByUrl("/employee/dashboard");
      } else {
        this.snackBar.open("Something went wrong.", "ERROR", { duration: 5000 });
      }
    });
  } else {
    console.error("Status control is null.");
  }
  }
}
