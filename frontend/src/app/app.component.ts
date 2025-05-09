import {Component, computed, HostBinding, OnInit, signal} from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { OverlayContainer } from '@angular/cdk/overlay';
import { StorageService } from './auth/service/storage/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isEmployeeLogged: boolean = StorageService.isEmployeeLoggedIn();
  isAdminLogged: boolean = StorageService.isAdminLoggedIn();
  collapsed = signal(false);
  sidenavWitdh = computed(() => this.collapsed() ? '65px' : '250px');

  switchTheme = new FormControl(false);
  @HostBinding('class') className = '';
  darkClass = 'dark-theme';
  lightClass = 'light-theme';
  @HostBinding('class.dark-theme') isDarkTheme = false;

  constructor(
    private router: Router,
    private overlay: OverlayContainer
  ) {}

  ngOnInit() {
    this.switchTheme.valueChanges.subscribe((res) => {
      this.isDarkTheme = res!;
      this.className = res ? this.darkClass : this.lightClass;

      if (res) {
        this.overlay.getContainerElement().classList.add(this.darkClass);
      } else {
        this.overlay.getContainerElement().classList.remove(this.darkClass);
      }
    });

    this.router.events.subscribe(() => {
      this.isEmployeeLogged = StorageService.isEmployeeLoggedIn();
      this.isAdminLogged = StorageService.isAdminLoggedIn();
    });
  }

  toggleCollapse() {
    this.collapsed.set(!this.collapsed());
  }

  logout() {
    StorageService.logout();
    this.router.navigateByUrl('/login');
  }

  toggleTheme() {
    this.switchTheme.setValue(!this.switchTheme.value);
  }
}
