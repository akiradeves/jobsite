import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {

  public form:FormGroup;
  public email:AbstractControl;
  public password:AbstractControl;
  public submitted:boolean = false;

  messageClass;
  message;
  
  constructor(
    fb:FormBuilder, 
    private router:Router,
    private authService: AuthService) {
    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
  }

  public onSubmit(values:Object):void {
    this.submitted = true;
    if (this.form.valid) {

      const user = {
        email: this.form.get('email').value,
        password: this.form.get('password').value
      }

      this.authService.login(user).subscribe(data => {
        // check if response was a success or error
        if (!data.success) {
          this.messageClass = 'alert alert-danger';
          this.message = data.message;          
        } else {
          this.messageClass = 'alert alert-success';
          this.message = data.message;

          // store token in local storage
          this.authService.storeUserData(data.token, data.user);

          this.router.navigate(['/pages/users']);
        }
      });
    }
  }
}
