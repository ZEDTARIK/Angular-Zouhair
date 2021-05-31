import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  constructor(private fb : FormBuilder) { }

  ngOnInit() {
    this.employeeForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      email: [''],
      skills: this.fb.group({
        skillName: [''],
        experienceInYear: [''],
        proficiency: ['']
      })
    });
  }

  onSubmit() {
    console.log(this.employeeForm.value);
  }

  // setValue = must all variable data be present
  // patchValue = you can put some value , not all

  onLoading() {
    this.employeeForm.patchValue({
      fullName: 'Zouhair ETTARAK',
      email: 'ettarak.zouhair@gmail.com',
      skills: {
        skillName: 'Angular, Alogorithm',
        experienceInYear: 1,
        proficiency: 'beginner'
      }
    });
  }

}
