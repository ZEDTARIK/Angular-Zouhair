import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {
  customerForm: FormGroup;

  validationMessage = {
    fullName: {
      required: 'FullName is Required',
      minlength: 'FullName must be greater than 4 characters',
      maxlength: 'FullName must be less than 60 characters'
    },
    Email: {
      required: 'Email is Required',
      email: 'Invalid Email'
    },
    City: {
      required: 'City is Required',
    },
    PhoneNumber: {
      required: 'PhoneNumber is Required',
    }
  };

  formErrors = {
    fullName: '',
    Email: '',
    City: '',
    PhoneNumber: ''
  };

  constructor(private formbuild: FormBuilder) { }

  ngOnInit() {
    this.customerForm = this.formbuild.group({
      fullName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(60)]],
      Email: ['', [Validators.required, Validators.email]],
      Adresse: this.formbuild.group({
        City: ['', Validators.required],
        PhoneNumber: ['', Validators.required]
      })
    });

    this.customerForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.customerForm);
    });
  }

  onSubmit(): void {
    console.log(this.customerForm.value);
  }



  logValidationErrors(group: FormGroup = this.customerForm) {
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

}
