import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable()
export class UsersService {
	domain = environment.domain;
	options;
	data;

  constructor(private http: Http,
  	private authService: AuthService) {}

  // Function to get all users
  getAll() {
  	this.options = this.authService.getAuthorizationOptions();
  	return this.http.get(this.domain + '/user/getAll', this.options).map(res => res.json());
  }

  // Function to remove a user
  remove(user) {
  	this.options = this.authService.getAuthorizationOptions();
  	return this.http.delete(this.domain + '/user/remove/' + user._id, this.options).map(res => res.json());
  }

  // Function to add a new user
  add(user) {
    this.options = this.authService.getAuthorizationOptions();
    return this.http.post(this.domain + '/user/add', user, this.options).map(res => res.json());
  }

  // Function to get a user
  get(id) {
    this.options = this.authService.getAuthorizationOptions();
    return this.http.get(this.domain + '/user/get/' + id, this.options).map(res => res.json());
  }

  // Function to edit a user
  edit(user) {
    this.options = this.authService.getAuthorizationOptions();
    return this.http.put(this.domain + '/user/update/' + user._id, user, this.options).map(res => res.json());
  }
}
