import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  authForm: FormGroup;
  redirectTo = '';
  isLogging = false;
  // tslint:disable-next-line:max-line-length
  constructor(private snackbar: MatSnackBar, private fb: FormBuilder, private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.initForm();
    this.redirectIfAuthenticated();
  }

  initForm() {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  signIn() {
    if (this.authForm.invalid) {
      return;
    }
    this.isLogging = true;
    const email = this.authForm.value.email;
    const pass = this.authForm.value.password;

    this.authService.signIn(email, pass).subscribe(
      (res: any) => {
        localStorage.setItem('auth', res.token);
        this.router.navigate(['']);
      },
      (err) => {
        this.snackbar.open(err.error.message, 'Okay', {
          duration: 5000
        });
        this.isLogging = false;

      }
    );

  }

  redirectIfAuthenticated() {

    const token = this.authService.checkToken();
    if (token != false) {
      this.router.navigate(['']);
    }
  }

}
