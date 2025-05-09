import { Component } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrl: './view-task.component.scss'
})
export class ViewTaskComponent {

  id:number;
  task:any;
  constructor(private service:EmployeeService,
              private router: Router,
              private route: ActivatedRoute) {
    this.id = + this.route.snapshot.params['id'];
    this.getTaskById();

  }

  getTaskById() {
    this.service.getTaskById(this.id).subscribe((res) => {
      console.log(res);
      this.task = res;
    })
  }
}
