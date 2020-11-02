import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '@app/core/authentication';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) {}

  public canActivate(): boolean {
    const session = this.authService.getSession();
    if (!session) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
