import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from 'ng2-bootstrap-modal';
import { FlashMessagesService } from 'angular2-flash-messages';

import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ConfirmModalComponent } from '../../components/confirm-modal/confirm-modal.component';

import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-jobdetail',
  templateUrl: './jobdetail.component.html',
  styleUrls: ['./jobdetail.component.css']
})
export class JobDetailComponent implements OnInit {
  public step: number;
  public email_address: AbstractControl;
  constructor(
  	fb: FormBuilder,
  	private router: Router,
    private dialogService: DialogService,
  	private emailService: EmailService,
    private flashMessagesService: FlashMessagesService) {
      // this.inviteform = fb.group({
      //   'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
      // });
      // this.email_address = this.inviteform.controls['email'];
      this.step = 0;
  }

  ngOnInit() {
  }
  NextStep(){
    this.step = this.step + 1;
  }
}
