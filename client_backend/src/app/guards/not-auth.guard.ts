import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NotAuthGuard implements CanActivate {

	constructor(
		private authService: AuthService,
		private router: Router
		){}

	// Function to determine whether user is authorized to view route
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  	if (this.authService.loggedIn()) {
  		this.router.navigate(['/']);
  		return false;
  	} else {
  		return true;
  	}
  }
}
