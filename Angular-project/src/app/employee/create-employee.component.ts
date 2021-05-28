import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  constructor() { }

  ngOnInit() {
    this.employeeForm = new FormGroup({
      fullName: new FormControl(),
      email: new FormControl(),
      // FormGroup Skills
      skills: new FormGroup({
        skillName: new FormControl(),
        experienceInYear: new FormControl(),
        proficiency: new FormControl()
      })
    });
  }

  onSubmit() {
    console.log(this.employeeForm.value);
  }

}
