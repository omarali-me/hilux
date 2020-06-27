
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {tap} from 'rxjs/operators';
import { AuthenticationService } from './shared/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private router: Router, private authenticationService: AuthenticationService) {}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>  {
    return this.authenticationService.checkAuthentication().pipe(
      tap(signedIn => {
        if (!signedIn)
          this.router.navigate(['/login']);
      }));
  }
}
