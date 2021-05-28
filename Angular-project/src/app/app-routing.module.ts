import { ListEmployeeComponent } from './employee/list-employee.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateEmployeeComponent } from './employee/create-employee.component';

const appRouter: Routes = [
  { path: 'employee-list', component: ListEmployeeComponent},
  { path: 'employee-create', component: CreateEmployeeComponent},
  { path: '', redirectTo: '/employee-list', pathMatch: 'full' }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRouter)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
