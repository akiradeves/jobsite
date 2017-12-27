import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import { environment } from '../../environments/environment';

import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

	domain = environment.domain;
	authToken;
	user;
  options;

  constructor(
  	private http: Http
  	) { }

  // Function to create headers, add token, to be used in HTTP requests
  createAuthenticationHeaders() {
    this.loadToken(); // Get token so it can be attached to headers

    // Headers configuration options
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',
        'authorization': this.authToken
      })
    });
  }

  // Function to return options with authorization value
  getAuthorizationOptions() {
    this.createAuthenticationHeaders();

    return this.options;
  }

  // Function to return authorization header fields
  getAuthorizationToken() {
    this.loadToken();
    return this.authToken;
  }

  // Function to return current user info
  getCurrentUserInfo() {
    this.loadToken();
    return this.user;
  }

  // Functin to get token from client local storage
  loadToken() {
    this.authToken = localStorage.getItem('token');
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  // Function to login user
  login(user) {
  	return this.http.post(this.domain + '/auth/login_backend', user).map(res => res.json());
  }

  // Function to logout
  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
    console.log('trying to clear local storage!');
  }

  // Function to store user's data in client local storage
  storeUserData(token, user) {
  	localStorage.setItem('token', token);
  	localStorage.setItem('user', JSON.stringify(user));
  	this.authToken = token;
  	this.user = user;
  }

  // Function to check if user is logged in
  loggedIn() {
    // if (tokenNotExpired()) {
    //   this.loadToken();
    //   if (this.user.role.toLowerCase() == 'admin') {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // } else {
    //   return false;
    // }
    return true;
  }
}
