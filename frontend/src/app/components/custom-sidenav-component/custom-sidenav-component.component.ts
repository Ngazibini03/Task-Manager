import { Component, computed, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../auth/service/storage/storage.service';
import { Router } from '@angular/router';

export type adminMenuItem = {
  icon:string;
  label:string;
  route:string;
}

export type employeeMenuItem = {
  icon:string;
  label:string;
  route:string;
}

@Component({
  selector: 'app-custom-sidenav-component',
  templateUrl: './custom-sidenav-component.component.html',
  styleUrl: './custom-sidenav-component.component.scss'
})
export class CustomSidenavComponentComponent {

  user:any;
  isEmployeeLogged: boolean = StorageService.isEmployeeLoggedIn();
  isAdminLogged: boolean = StorageService.isAdminLoggedIn();
  sideNavCollapsed = signal(false);
  @Input() set collapsed(val:boolean) {
    this.sideNavCollapsed.set(val);
  }

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(event=>{
      this.user = StorageService.getUser();
      this.isEmployeeLogged = StorageService.isEmployeeLoggedIn();
      this.isAdminLogged = StorageService.isAdminLoggedIn();
    })
  }

  adminMenuItems = signal<adminMenuItem[]>([
    {
      icon: 'dashboard',
      label: 'Dashboard',
      route: '/admin/dashboard'
    },
    {
      icon: 'add_box',
      label: 'Post Task',
      route: '/admin/task'
    }
  ]);

  employeeMenuItems = signal<employeeMenuItem[]>([
    {
      icon: 'dashboard',
      label: 'Dashboard',
      route: '/employee/dashboard'
    }
  ]);

  profilePicSize = computed(() => this.sideNavCollapsed() ? '42' : '100');
}
