import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from './../../services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted: any;
  usersUrl = `https://my-json-server.typicode.com/bokadedarvin/AngularDeveloperSample/users`;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private httpService: HttpService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
          ),
        ],
      ],
    });
  }

  ngOnInit(): void {}

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    // stop here if form is invalid
    console.log('this.loginForm', this.loginForm);
    if (this.loginForm.invalid) {
      return;
    }
    this.httpService.get(this.usersUrl).subscribe((response: any) => {
      console.log('response', response);
      var user = response.find(
        (user: any) =>
          user.email.toLowerCase() ===
          this.loginForm.value.username.toLowerCase()
      );
      console.log('user', user);
      if (user && user.email) {
        this.router.navigateByUrl('/dashboard');
        console.log('Login success!');
      } else {
        alert('Please enter valid username!');
      }
    });
  }
}
