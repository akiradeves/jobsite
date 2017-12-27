import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {

	redirectUrl;

	constructor(
		private authService: AuthService,
		private router: Router
		){}

	// Function to determine whether user is authorized to view route
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  	// check if user is logged in
  	if (this.authService.loggedIn()) {
  		return true;
  	} else {
  		this.redirectUrl = state.url; // grab previous url
  		this.router.navigate(['/login']);
  		return false;
  	}
  }
}
