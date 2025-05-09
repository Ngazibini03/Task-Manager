import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UpdateTaskComponent } from './components/update-task/update-task.component';
import { ViewTaskComponent } from './view-task/view-task.component';

const routes: Routes = [
  {path: "dashboard", component: DashboardComponent},
  {path: "task/:id/edit", component: UpdateTaskComponent},
  {path: "task/:id/view", component: ViewTaskComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
