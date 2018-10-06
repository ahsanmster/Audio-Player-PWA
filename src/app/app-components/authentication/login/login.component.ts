import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../providers/auth.service';
import { Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';
import { ApiService } from '../../../providers/api.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  email: string;
  password: string;
  loading: boolean = false;
  message: string;

  constructor(private authService: AuthService, private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    
  }

  login(): void {
    this.loading = true;
    if (this.validateForm(this.email, this.password)) {
      this.authService.loginWithEmail(this.email, this.password)
        .then(() => {
          if(this.authService.redirectUrl) {
              this.router.navigate([this.authService.redirectUrl]);
          } else {
            this.router.navigate(['/']);
          }
          this.loading = false;
        })
        .catch(_error => {
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
