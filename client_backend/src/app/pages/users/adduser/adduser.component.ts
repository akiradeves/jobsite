import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { DialogService } from 'ng2-bootstrap-modal';
import { ConfirmModalComponent } from '../../../theme/components/confirm-modal/confirm-modal.component';

import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../services/auth.service';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AdduserComponent implements OnInit {

  public form: FormGroup;
  public first_name: AbstractControl;
  public last_name: AbstractControl;
  public email: AbstractControl;
  public organization: AbstractControl;
  public password: AbstractControl;
  public confirm_password: AbstractControl;
  public role: AbstractControl;

  domain = environment.domain;

  constructor(
    fb:FormBuilder,
    private router: Router,
    private dialogService: DialogService,
    private authService: AuthService,
    private usersService: UsersService,
    private flashMessagesService: FlashMessagesService
    ) {

      this.form = fb.group({
        'first_name': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
        'last_name': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
        'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        'organization': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
        'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        'confirm_password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        'role': ['', Validators.compose([Validators.required, Validators.minLength(1)])]
      });

      this.first_name = this.form.controls['first_name'];
      this.last_name = this.form.controls['last_name'];
      this.email = this.form.controls['email'];
      this.organization = this.form.controls['organization'];
      this.password = this.form.controls['password'];
      this.confirm_password = this.form.controls['confirm_password'];
      this.role = this.form.controls['role'];
    }

  ngOnInit() {
    
  }

  submitForm(values: Object) {
    if (this.form.valid) {
      // If password and confirm password mismatch
      if (this.password.value != this.confirm_password.value) {
        this.flashMessagesService.show("Password mismatch.", { cssClass: 'alert-danger' });
        return;
      }

      const user = {
        first_name: this.first_name.value,
        last_name: this.last_name.value,
        email: this.email.value,
        organization: this.organization.value,
        password: this.password.value,
        role: this.role.value
      };

      this.usersService.add(user).subscribe(data => {
        // If not success
        if (!data.success) {
          this.flashMessagesService.show(data.message, { cssClass: 'alert-danger' });
          console.log(data.message);
        } else {
          this.flashMessagesService.show("Added user succesfully.", { timeout:1000, cssClass: 'alert-info' });
          setTimeout(() => {
            this.router.navigate(['/pages/users']);
          }, 2000);
        }
      });
    } else {
      Object.keys(this.form.controls).forEach( field => {
        const control = this.form.get(field);
        control.markAsTouched({ onlySelf: true });
      });

      this.flashMessagesService.show("Please input data correctly.", { cssClass: 'alert-danger', timeout:3000 });
    }
  }

  public onSubmit(values: Object):void {
    // Open confirm dialog
    let disposable = this.dialogService.addDialog(
      ConfirmModalComponent,
      {
        title: 'Add user',
        message: 'Are you sure to add a user with input data?'
      }).subscribe((isConfirmed) => {
        if (isConfirmed) { // If confirmed
          this.submitForm(values);
        }
      });
  }
}
