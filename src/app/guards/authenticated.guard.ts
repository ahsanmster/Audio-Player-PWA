import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../providers/auth.service';

@Injectable()
export class AuthenticatedGuard implements CanActivate {

  constructor(private authService: AuthService,private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      this.checkAuth(state.url);
      return true;
  }

  checkAuth(url: string): boolean {
    this.authService.redirectUrl = url;
    const user = this.authService.getCurrentUser();
    if(user === null || user === undefined) {
      this.router.navigate(['/login']);
      return false;
    } else {
      if(url == '/login') {
        console.log(url);
        this.router.navigate(['/']);
      }
      return true;
    }
  }
}
