import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from 'ng2-bootstrap-modal';
import { FlashMessagesService } from 'angular2-flash-messages';

import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ConfirmModalComponent } from '../../components/confirm-modal/confirm-modal.component';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public form1: FormGroup;
	public first_name: AbstractControl;
	public last_name: AbstractControl;
  public email: AbstractControl;
  public confirm_email: AbstractControl;
  public password: AbstractControl;
  public user_type: AbstractControl;

  public form2: FormGroup;
	public form2_address: AbstractControl;
	public form2_city: AbstractControl;
  public form2_state: AbstractControl;
  public form2_zip: AbstractControl;
  public form2_category: AbstractControl;
  public form2_skills: AbstractControl;
  public form2_seeker_type: AbstractControl;
  public form2_rate: AbstractControl;
  public form2_resume_file: AbstractControl;

  public form3: FormGroup;
	public form3_company_name: AbstractControl;
	public form3_company_link: AbstractControl;
  public form3_company_overview: AbstractControl;
  
  public reg_status: number = 0;

  constructor(
  	fb: FormBuilder,
  	private router: Router,
    private dialogService: DialogService,
  	private authService: AuthService,
    private flashMessagesService: FlashMessagesService) {

      this.form1 = fb.group({
        'first_name': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
        'last_name': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
        'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        'confirm_email': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
        'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        'user_type': ['',Validators.compose([Validators.required, Validators.minLength(1)])]
      });

      this.first_name = this.form1.controls['first_name'];
      this.last_name = this.form1.controls['last_name'];
      this.email = this.form1.controls['email'];
      this.confirm_email = this.form1.controls['confirm_email'];
      this.password = this.form1.controls['password'];
      this.user_type = this.form1.controls['user_type'];

      this.form2 = fb.group({
        'form2_address': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
        'form2_city': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
        'form2_state': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        'form2_zip': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
        'form2_category': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        'form2_skills': ['',Validators.compose([Validators.required, Validators.minLength(1)])],
        'form2_seeker_type': ['',Validators.compose([Validators.required, Validators.minLength(1)])],
        'form2_rate': ['',Validators.compose([Validators.required, Validators.minLength(1)])],
        'form2_resume_file': ['',Validators.compose([Validators.required, Validators.minLength(1)])]
      });
      this.form2_address = this.form2.controls['form2_address'];
      this.form2_city = this.form2.controls['form2_city'];
      this.form2_state = this.form2.controls['form2_state'];
      this.form2_zip = this.form2.controls['form2_zip'];
      this.form2_category = this.form2.controls['form2_category'];
      this.form2_skills = this.form2.controls['form2_skills'];
      this.form2_seeker_type = this.form2.controls['form2_seeker_type'];
      this.form2_rate = this.form2.controls['form2_rate'];
      this.form2_resume_file = this.form2.controls['form2_resume_file'];


      this.form3 = fb.group({
        'form3_company_name': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
        'form3_company_link': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
        'form3_company_overview': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
      });
      this.form3_company_name = this.form3.controls['form3_company_name'];
      this.form3_company_link = this.form3.controls['form3_company_link'];
      this.form3_company_overview = this.form3.controls['form3_company_overview'];
  }

  ngOnInit() {
  }

  Form1Complete() {
    console.log("From1 Complete");
    console.log(this.first_name.value);
    console.log(this.user_type.value);
    this.reg_status = this.user_type.value;
  }
  Form2Complete() {
    console.log("From2 Complete");
    console.log(this.form2_address.value);
    console.log(this.form2_resume_file.value);
    const user = {
      first_name: this.first_name.value,
      last_name: this.last_name.value,
      email: this.email.value,
      password: this.password.value,
      role: 'Normal'
    };

    this.authService.register(user).subscribe(data => {
      // If not success
      if (!data.success) {
        console.log("not success");
      } else {
          this.router.navigate(['/login']);
      }
    });
  }
  Form3Complete() {
    console.log("From3 Complete");
    console.log(this.form3_company_name.value);
    console.log(this.form3_company_overview.value);
    const user = {
      first_name: this.first_name.value,
      last_name: this.last_name.value,
      email: this.email.value,
      password: this.password.value,
      role: 'Normal'
    };
    this.authService.register(user).subscribe(data => {
      // If not success
      if (!data.success) {
        console.log("not success");
      } else {
          this.router.navigate(['/login']);
      }
    });
  }

}
