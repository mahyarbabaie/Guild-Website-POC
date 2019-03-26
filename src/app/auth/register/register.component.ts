import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  forbiddenUsernames = [];

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService) {} // TODO: authService in back-end

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      'email': ['', [Validators.required, Validators.pattern('^\\w+[\\w-\\.]*\\@\\w+((-\\w+)|(\\w*))\\.[a-z]{2,3}$')]],
      'username': ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9].{5,15}$'), this.forbiddenNames.bind(this)]],
      'password': ['', [Validators.required, Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$')]]
    });
  }

  get formControls() { return this.registerForm.controls; }

  register() {
    console.log(this.registerForm.value);
    this.submitted = true;
    if (this.registerForm.invalid) { return;}
    this.authService.register(this.registerForm.value); // TODO: authService in back-end POST
    this.authService.login(this.registerForm.value); // TODO: authService in back-end GET
    this.router.navigate(['home']);
    this.registerForm.reset();
  }

  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true};
    }
    return null;
  }

}
