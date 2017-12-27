import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { setTimeout } from 'timers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form:FormGroup;
	public user_name: AbstractControl;
	public password: AbstractControl;
  
  constructor(
    fb:FormBuilder, 
    private router:Router,
    private authService: AuthService,
    private flashMessagesService: FlashMessagesService) {
    this.form = fb.group({
      'user_name': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.user_name = this.form.controls['user_name'];
    this.password = this.form.controls['password'];
  }

	ngOnInit() {

	}
	
  onLogIn() {
    console.log("onlogin");
    console.log(this.user_name.value);
    const user = {
      email: this.form.get('user_name').value,
      password: this.form.get('password').value
    }

    this.authService.login(user).subscribe(data => {
      // check if response was a success or error
      if (!data.success) {
        console.log("fail");
      } else {
        console.log("success");
        // store token in local storage
        this.authService.storeUserData(data.token, data.user);
        if(data.user.email == "server")
          this.router.navigate(['/seekersearch']);
        else
          this.router.navigate(['/jobsearch']);
      }
    });
  }

}
