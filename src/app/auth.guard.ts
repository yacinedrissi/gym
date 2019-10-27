import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthService } from './auth.service';
import { LoginService } from './demo/pages/authentication/auth-signin/login.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private loginService: LoginService,
    private router: Router,
    private appComponent: AppComponent) {

  }
  canActivate(
    next:ActivatedRouteSnapshot
  ): boolean {
    if (this.authService.isLoggedIn()) {
    let roles = next.data["roles"] as Array<string>;
    if (roles) {
      var match = this.loginService.roleMatch(roles)
      if (match) {
        return true
      }
      else{
        this.router.navigateByUrl('/forbidden')
        return false
      }
    }

      this.appComponent.setIsloggedInValue(true)
     
      return true;
    } else {
      this.appComponent.setIsloggedInValue(false)
      this.router.navigate(['/auth/signin']);
      
      return false;
    }
  }

}
