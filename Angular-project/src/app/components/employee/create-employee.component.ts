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
    fullName: {
      required: 'FullName is Required',
      minlength: 'FullName must be greater than 4 characters',
      maxlength: 'FullName must be less than 50 characters'
    },
    email: {
      required: 'Email is Required',
      email: 'Invalid email'
    },
    skillName: {
      required: 'Skills is Required'
    },
    experienceInYear: {
      required: 'experience is Required'
    },
    proficiency: {
      required: 'Proficiency is Required'
    },
    phoneNumber: {
      required: 'PhoneNumber is Required',
      minlength: 'PhoneNumber must be greater than 5 Number',
    }
  };

  formErrors = {
    fullName: '',
    email: '',
    skillName: '',
    experienceInYear: '',
    proficiency: '',
    phoneNumber: ''
  };
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.employeeForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      contactPreference: ['Email'],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [''],
      skills: this.fb.group({
        skillName: ['', Validators.required],
        experienceInYear: ['', Validators.required],
        proficiency: ['beginner', Validators.required]
      })
    });

    // valueChanges for dispaly Errors Messages
    this.employeeForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.employeeForm);
    });

    this.employeeForm.get('contactPreference').valueChanges.subscribe((data: string) => {
      this.onChoiceContact(data);
    })
  }

  onSubmit() {
    console.log(this.employeeForm.value);
  }

  // setValue = must all variable data be present
  // patchValue = you can put some value , not all

  onLoading() {
    this.employeeForm.patchValue({
      fullName: 'Zouhair ET-TARAK',
      email: 'ettarak.zouhair@gmail.com',
      skills: {
        skillName: 'Algorithm, SQL, Angular',
        experienceInYear: 2,
        proficiency: 'beginner'
      }
    });
    // this.logKeyValues(this.employeeForm);
  }

  logKeyValues(group: FormGroup): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if (abstractControl instanceof FormGroup) {
        this.logKeyValues(abstractControl);
      } else {
        console.log('key => ' + key + '  Value => ' + abstractControl.value);
      }
    });
  }

  logValidationErrors(group: FormGroup = this.employeeForm) {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      } else {
        this.formErrors[key] = '';
        if (abstractControl && !abstractControl.valid) {
          const message = this.validationMessage[key];

          for (const errorKey in abstractControl.errors) {
            if (errorKey) {
              this.formErrors[key] += message[errorKey] + ' ';
            }
          }

        }
      }
    });
  }


  onChoiceContact(selected: string) {
    const phoneNumberControl = this.employeeForm.get('phoneNumber');
    if (selected === 'PhoneNumber') {
      phoneNumberControl.setValidators([Validators.required, Validators.minLength(6)]);
    } else {
      phoneNumberControl.clearValidators();
    }
    phoneNumberControl.updateValueAndValidity();
  }

}
