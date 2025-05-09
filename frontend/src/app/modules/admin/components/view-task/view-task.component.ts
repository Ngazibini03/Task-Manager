import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { PopupService } from '../../../../auth/service/popup/popup.service';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrl: './view-task.component.scss'
})
export class ViewTaskComponent {
  id: number;
  task:any;
  constructor(private router:Router,
              private route: ActivatedRoute,
              private service: AdminService,
              private popupService: PopupService) {
    this.id = + this.route.snapshot.params['id'];
    this.getTaskById();
  }

  openDialog(task:any) {
    this.popupService.popupDialog({
      id: task.id,
      title: task.title
    });
  }

  getTaskById() {
    this.service.getTaskById(this.id).subscribe((res) => {
      console.log(res);
      this.task = res;
    })
  }
}
