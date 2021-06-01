import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  employeeForm: FormGroup;

  // Move Validation to Component
  validationMessage = {
    'fullName': {
      'required': 'FullName is Required',
      'minLength': 'FullName must be greater than 4 characters',
      'maxLength': 'FullName must be less than 50 characters'
    },
    'email': {
      'required': 'Email is Required'
    },
    'skillName': {
      'required': 'Skills is Required'
    },
    'experienceInYear': {
      'required': 'experience is Required'
    },
    'proficiency': {
      'required': 'Proficiency is Required'
    }
  };

  formError = {
    'fullName': '',
    'email': '',
    'skillName': '',
    'experienceInYear': '',
    'proficiency': ''
  };
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.employeeForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      email: ['', Validators.required],
      skills: this.fb.group({
        skillName: ['', Validators.required],
        experienceInYear: ['', Validators.required],
        proficiency: ['', Validators.required]
      })
    });
  }

  onSubmit() {
    //console.log(this.employeeForm.value);
    this.logValidationErrors(this.employeeForm);
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
    this.logKeyValues(this.employeeForm);
  }

  logKeyValues(group: FormGroup): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if (abstractControl instanceof FormGroup) {
        this.logKeyValues(abstractControl);
      } else {
        console.log("key => " + key + "  Value => " + abstractControl.value);
      }
    });
  }

  logValidationErrors(group: FormGroup): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl)
      } else {
        const message = this.validationMessage[key];
        for ( const errorKey in abstractControl.errors) {
          if(errorKey) {
            this.formError[key] += message[errorKey] + ' ';
          }
        }
      }
    })
  }

}
