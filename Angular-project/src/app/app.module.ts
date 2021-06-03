import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CreateEmployeeComponent } from './components/employee/create-employee.component';
import { ListEmployeeComponent } from './components/employee/list-employee.component';
import { AppRoutingModule } from './app-routing.module';
import { CreateCustomerComponent } from './components/customer/create-customer/create-customer.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateEmployeeComponent,
    ListEmployeeComponent,
    CreateCustomerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
