import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute} from '@angular/router';
import { DialogService } from 'ng2-bootstrap-modal';
import { FlashMessagesService } from 'angular2-flash-messages';

import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ConfirmModalComponent } from '../../components/confirm-modal/confirm-modal.component';

import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  public inviteform: FormGroup;
  public email_address: AbstractControl;
  public active: string;
  constructor(
  	fb: FormBuilder,
    private router: Router,
    private active_route: ActivatedRoute,
    private dialogService: DialogService,
  	private emailService: EmailService,
    private flashMessagesService: FlashMessagesService) {
      this.inviteform = fb.group({
        'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
      });
      this.email_address = this.inviteform.controls['email'];
      this.active = 'identify';
  }

  ngOnInit() {
  }
  submitForm(values: Object) {
      console.log("submitForm",this.email_address.value);
      this.emailService.send(this.email_address.value).subscribe(data => {
       console.log(data);
        // if (!data.success) {
        //   this.flashMessagesService.show(data.message, { timeout: 1900, cssClass: 'alert-danger flashfade' });
        //   console.log(data.message);
        // } else {
        //   this.flashMessagesService.show(data.message, { timeout: 1900, cssClass: 'alert-info flashfade' });
        //   console.log(data.message);
        // }
      });
  }
  public onSendEmail(values:Object):void {
    console.log("onSendEmail");
    // Open confirm dialog
    let disposable = this.dialogService.addDialog(
      ConfirmModalComponent,
      {
        title: 'Send Invitation Email',
        message: 'Are you sure to invite this person to our services?'
      }).subscribe((isConfirmed) => {
        if (isConfirmed) { // If confirmed
          this.submitForm(values);
        }
      });
  }
  public onEnroll():void{
    this.router.navigate(['/welcome/enroll']);
  }
  public onIdentify():void{
    this.router.navigate(['/welcome/identify']);
  }
  public onVerify():void{
    this.router.navigate(['/welcome/verify']);
  }
  public onActivate(componentRef):void{
    this.active = componentRef.constructor.name;
  }
}
