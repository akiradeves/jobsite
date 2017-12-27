import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import {Observable} from 'rxjs/Observable';
import {nodemailer} from 'nodemailer';

@Injectable()
export class EmailService {

    domain = environment.domain;
    options;

  constructor(private http: Http,
  	private authService: AuthService) {}

  // Function to send email
  send(email) {
    this.options = this.authService.getAuthorizationOptions();
    console.log("options: ", this.options);
    return this.http.post(this.domain + '/mailer/invite', {email:email}, this.options).map(res => res.json());
  }

}