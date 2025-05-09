import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PostTaskComponent } from './components/post-task/post-task.component';
import { DemoAngularMaterialModule } from '../../DemoAngularMaterialModule';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UpdateTaskComponent } from './components/update-task/update-task.component';
import { PopupComponent } from './components/popup/popup.component';
import { FilterPipe } from './components/dashboard/filter.pipe';
import { ViewTaskComponent } from './components/view-task/view-task.component';

@NgModule({
  declarations: [
    DashboardComponent,
    PostTaskComponent,
    UpdateTaskComponent,
    PopupComponent,
    FilterPipe,
    ViewTaskComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DemoAngularMaterialModule
  ]
})
export class AdminModule { }
