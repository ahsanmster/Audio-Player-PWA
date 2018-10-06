import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { AuthService } from '../../../providers/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  email: string;
  password: string;
  loading: boolean = false;
  message: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  signUp(): void {
    this.loading = true;
    if(this.validateForm(this.email, this.password)) {
      this.authService.signUpWithEmail(this.email, this.password)
      .then(() => {
        this.router.navigate(['/']);
        this.loading = false;
      }).catch(_error => {
        console.log(_error);
        this.message = _error.message;
        this.loading = false;
      })
    }
  }

  loginWithGoogle(): void {
    this.authService.signInWithGoogle();
    this.router.navigate['/'];
  }

  loginWithFacebook(): void {
    this.authService.signInWithFacebook();
  }

  validateForm(email: string, password: string): boolean {
    return true;
  }
  
}
