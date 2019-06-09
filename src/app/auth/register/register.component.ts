import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, Form, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {AppConstants} from '../../app.constants';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  forbiddenUsernames = [];
  hasDuplicateName = false;
  hasDuplicateEmail = false;
  hasRegistrationSucceeded = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService) {

    this.hasRegistrationSucceeded = false;
    this.registerForm = this.formBuilder.group({
      'email': ['', [Validators.required, Validators.pattern('^\\w+[\\w-\\.]*\\@\\w+((-\\w+)|(\\w*))\\.[a-z]{2,3}$')]],
      'username': ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9].{5,15}$'), this.forbiddenNames.bind(this)]],
      'password': ['', [Validators.required, Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$')]],
      'confirmPassword': ['', Validators.required ]
    },
      {validator: this.validatePassword('password', 'confirmPassword')});
  }

  ngOnInit() {}

  get formControls() { return this.registerForm.controls; }

  register() {
    this.submitted = true;
    if (this.registerForm.invalid) { return; }
    this.authService.register(this.registerForm.value)
      .subscribe(
        data => {
          console.log('success section of register()');
          const dataJson = JSON.parse(JSON.stringify(data));
          console.log('Reading Status');
          console.log(dataJson.status);
          console.log('After Status');
          if (dataJson.status === 200) {
            this.hasDuplicateName = false;
            this.hasDuplicateEmail = false;
            this.hasRegistrationSucceeded = true;
            this.submitted = false;
            this.registerForm.reset();
          }
        },
        error => {
          console.log('error section of register()');
          console.log(error);
          const errorJson = JSON.parse(JSON.stringify(error));
          if (errorJson.error.code === AppConstants.ACCOUNT_USERNAME_ALREADY_EXISTS) {
            console.log('name');
            this.hasDuplicateName = true;
            this.hasRegistrationSucceeded = false;
          }
          if (errorJson.error.code === AppConstants.ACCOUNT_EMAIL_ALREADY_EXISTS) {
            console.log('email');
            this.hasDuplicateEmail = true;
            this.hasRegistrationSucceeded = false;
          }
        }
      );
  }

  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true};
    }
    return null;
  }

  validatePassword(passwordKey: string, confirmPasswordKey: string) {
    return (formgroup: FormGroup) => {
      const password = formgroup.controls[passwordKey];
      const confirmPassword = formgroup.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        confirmPassword.setErrors({validatePassword: true});
      } else {
        confirmPassword.setErrors(null);
      }
    };
  }

}
