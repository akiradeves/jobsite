import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from 'ng2-bootstrap-modal';
import { FlashMessagesService } from 'angular2-flash-messages';

import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ConfirmModalComponent } from '../../components/confirm-modal/confirm-modal.component';
import { setTimeout } from 'timers';


interface JobData {
  job_title: string;
  job_type: string;
  payment_type: string;
  job_price: string;
  job_category: string;
  job_posted_time: string;
  job_description: string;
  job_required_skills: string;
  number_of_proposals: number;
  job_term_type: string;
}

@Component({
  selector: 'app-jobsearch',
  templateUrl: './jobsearch.component.html',
  styleUrls: ['./jobsearch.component.css']
})

export class JobSearchComponent implements OnInit {

  public job_search_term_type: number;
  public job_search_category: number;
  public job_search_skills: number;
  public job_search_salary_monthly: number;
  public job_search_salary_fixed: number;
  public job_search_keyword: string;
 
  public number_of_search_result:number;

  public jobsData :JobData [];

  constructor(
    fb: FormBuilder,
    private ref: ChangeDetectorRef,
  	private router: Router,
    private dialogService: DialogService,
    private flashMessagesService: FlashMessagesService) {
     
      this.number_of_search_result = 2;
      this.jobsData = [{
        job_title: "Real Estate property Mgmt",
        job_type: "Ongoing",
        payment_type: "Fixed Price",
        job_price: "$250",
        job_category: "string",
        job_posted_time: "Posted 19 hours ago",
        job_description: "Looking to get a program made that would allow me to to manage each properly individually and give the tenants a user pass tell logon to the system so they can pay rent and that will automatically get",
        job_required_skills: "web development, security officer, coding, programming",
        number_of_proposals: 50,
        job_term_type: "Part time"
      },{
        job_title: "Urgent Need on House Building",
        job_type: "One-time",
        payment_type: "Hourly",
        job_price: "$50/h",
        job_category: "string",
        job_posted_time: "Posted 1 day ago",
        job_description: "Gonna get a program made that would allow me to to manage each properly individually and give the tenants a user pass tell logon to the system so they can pay rent and that will automatically get",
        job_required_skills: "house building, security officer",
        number_of_proposals: 20,
        job_term_type: "Full time"
      }];
  }

  ngOnInit() {
  }
  SearchJobs(){
    console.log("Search Jobs");
  }
  ShowJobDetail(job){
    console.log(job);
    this.router.navigate(['/jobdetail']);
  }
}
