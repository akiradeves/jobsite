import { Component, OnInit } from '@angular/core';

import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
	public form: FormGroup;
	public first_name: AbstractControl;
	public last_name: AbstractControl;
  public email: AbstractControl;
  public phone: AbstractControl;
  public message: AbstractControl;

  constructor(
  	fb: FormBuilder,
    private flashMessagesService: FlashMessagesService) { 

  	this.form = fb.group({
  		'first_name': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
  		'last_name': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
  		'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
  		'phone': [''],
      'message': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
  	});

  	this.first_name = this.form.controls['first_name'];
  	this.last_name = this.form.controls['last_name'];
  	this.email = this.form.controls['email'];
  	this.phone = this.form.controls['phone'];
  	this.message = this.form.controls['message'];
  }

  ngOnInit() {
  }

  public onSubmit(values: Object) {
  	console.log('send');
  }
}
