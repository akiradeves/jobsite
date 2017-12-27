import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from 'ng2-bootstrap-modal';
import { FlashMessagesService } from 'angular2-flash-messages';

import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ConfirmModalComponent } from '../../components/confirm-modal/confirm-modal.component';

import { AuthService } from '../../services/auth.service';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-jobposting',
  templateUrl: './jobposting.component.html',
  styleUrls: ['./jobposting.component.css']
})
export class JobPostingComponent implements OnInit {


  public form1: FormGroup;
	public job_type: AbstractControl;
	public job_category: AbstractControl;
  public job_title: AbstractControl;
  public job_description: AbstractControl;

  public form2: FormGroup;
	public job_required_skills: AbstractControl;
	public job_required_time: AbstractControl;
  public job_term_type: AbstractControl;
  public payment_type: AbstractControl;
  public seeker_exp_level: AbstractControl;
  public job_expect_time: AbstractControl;
  public job_attachment: AbstractControl;

  
  public post_status: number = 0;

  constructor(
  	fb: FormBuilder,
  	private router: Router,
    private dialogService: DialogService,
  	private authService: AuthService,
    private flashMessagesService: FlashMessagesService) {

      this.form1 = fb.group({
        'job_type': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
        'job_category': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
        'job_title': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        'job_description': ['', Validators.compose([Validators.required, Validators.minLength(3)])]
      });

      this.job_type = this.form1.controls['job_type'];
      this.job_category = this.form1.controls['job_category'];
      this.job_title = this.form1.controls['job_title'];
      this.job_description = this.form1.controls['job_description'];

      this.form2 = fb.group({
        'job_required_skills': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
        'job_required_time': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
        'job_term_type': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        'payment_type': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
        'seeker_exp_level': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        'job_expect_time': ['',Validators.compose([Validators.required, Validators.minLength(1)])],
        'job_attachment': ['',Validators.compose([Validators.required, Validators.minLength(1)])]
      });
      this.job_required_skills = this.form2.controls['job_required_skills'];
      this.job_required_time = this.form2.controls['job_required_time'];
      this.job_term_type = this.form2.controls['job_term_type'];
      this.payment_type = this.form2.controls['payment_type'];
      this.seeker_exp_level = this.form2.controls['seeker_exp_level'];
      this.job_expect_time = this.form2.controls['job_expect_time'];
      this.job_attachment = this.form2.controls['job_attachment'];
  }

  ngOnInit() {
  }

  Form1Complete() {
    console.log("From1 Complete");

    this.post_status = 1;
  }
  Form2Complete() {
    console.log("From2 Complete");
    this.router.navigate(['/seekersearch']);
  }
}
