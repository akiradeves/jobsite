import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { DialogService } from 'ng2-bootstrap-modal';
import { ConfirmModalComponent } from '../../../theme/components/confirm-modal/confirm-modal.component';

import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../services/auth.service';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.scss']
})
export class EdituserComponent implements OnInit {

  public form: FormGroup;
  public first_name: AbstractControl;
  public last_name: AbstractControl;
  public email: AbstractControl;
  public organization: AbstractControl;
  public password: AbstractControl;
  public confirm_password: AbstractControl;
  public role: AbstractControl;

  domain = environment.domain;
  urlParams;

  user: any = {
  	_id: '',
  	first_name: '',
  	last_name: '',
    email: '',
  	organization: '',
  	password: '',
  	role: ''
  };

  constructor(
    fb:FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
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
        'password': [''],
        'confirm_password': [''],
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
    this.urlParams = this.activatedRoute.snapshot.params;
    this.usersService.get(this.urlParams.id).subscribe(data => {
      // Check if not success
      if (!data.success) {
        this.flashMessagesService.show(data.message, { cssClass: 'alert-danger' });
      } else {
        this.user = {
          _id: data.user._id,
          organization: data.user.organization,
          first_name: data.user.first_name,
          last_name: data.user.last_name,
          email: data.user.email,
          role: data.user.role,
        };

        // console.log(this.profile.picture);
      }
    });
  }

  submitForm(values: Object) {
    if (this.form.valid) {
      // If password and confirm password mismatch
      if (this.password.value != this.confirm_password.value) {
        this.flashMessagesService.show("Password mismatch.", { cssClass: 'alert-danger' });
        return;
      }

      this.user.organization = this.organization.value;
      this.user.first_name = this.first_name.value;
      this.user.last_name = this.last_name.value;
      this.user.email = this.email.value;
      this.user.password = this.password.value;
      this.user.role = this.role.value;

      this.usersService.edit(this.user).subscribe(data => {
        // If not success
        if (!data.success) {
          this.flashMessagesService.show(data.message, { cssClass: 'alert-danger' });
          console.log(data.message);
        } else {
          this.flashMessagesService.show("Saved user succesfully.", { timeout:1000, cssClass: 'alert-info' });
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
      
      this.flashMessagesService.show("Please input data correctly.", { cssClass: 'alert-danger' });
    }
  }

  public onSubmit(values: Object):void {
    // Open confirm dialog
    let disposable = this.dialogService.addDialog(
      ConfirmModalComponent,
      {
        title: 'Edit user',
        message: 'Are you sure to save a user with input data?'
      }).subscribe((isConfirmed) => {
        if (isConfirmed) { // If confirmed
          this.submitForm(values);
        }
      });
  }
}
