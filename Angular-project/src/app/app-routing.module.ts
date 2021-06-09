import { CreateCustomerComponent } from './components/customer/create-customer/create-customer.component';
import { ListEmployeeComponent } from './components/employee/list-employee.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateEmployeeComponent } from './components/employee/create-employee.component';

const appRouter: Routes = [
  { path: 'employee-list', component: ListEmployeeComponent},
  { path: 'employee-create', component: CreateEmployeeComponent},
  { path: '', redirectTo: '/employee-list', pathMatch: 'full' },
  { path: 'customer-create', component: CreateCustomerComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRouter)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
