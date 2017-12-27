import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable()
export class GroupsService {
	domain = environment.domain;
	options;
	data;

  constructor(private http: Http,
  	private authService: AuthService) {}

  // Function to get all groups
  getAll() {
  	this.options = this.authService.getAuthorizationOptions();
  	return this.http.get(this.domain + '/group/getallgroups', this.options).map(res => res.json());
  }

  // Function to remove a group
  remove(group) {
  	this.options = this.authService.getAuthorizationOptions();
  	return this.http.delete(this.domain + '/group/removegroup/' + group._id, this.options).map(res => res.json());
  }

  // Function to add a new group
  add(group) {
    this.options = this.authService.getAuthorizationOptions();
    return this.http.post(this.domain + '/group/addgroup', group, this.options).map(res => res.json());
  }

  // Function to get a group
  get(id) {
    this.options = this.authService.getAuthorizationOptions();
    return this.http.get(this.domain + '/group/getgroup/' + id, this.options).map(res => res.json());
  }

  // Function to edit a group
  edit(group) {
    this.options = this.authService.getAuthorizationOptions();
    return this.http.put(this.domain + '/group/updategroup/' + group._id, group, this.options).map(res => res.json());
  }
}
