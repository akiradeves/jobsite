import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from 'ng2-bootstrap-modal';
import { FlashMessagesService } from 'angular2-flash-messages';

import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ConfirmModalComponent } from '../../components/confirm-modal/confirm-modal.component';

import { EmailService } from '../../services/email.service';

interface SeekerData {
  seeker_name: string;
  seeker_title: string;
  seeker_overview: string;
}

@Component({
  selector: 'app-seekersearch',
  templateUrl: './seekersearch.component.html',
  styleUrls: ['./seekersearch.component.css']
})
export class SeekerSearchComponent implements OnInit {
  public seeker_search_type: number;
  public seeker_search_category: number;
  public seeker_search_skills: number;
  public seeker_search_salary_monthly: number;
  public seeker_search_salary_fixed: number;
  public seeker_search_keyword: string;
 
  public number_of_search_result:number;

  public seekersData :SeekerData [];
  constructor(
  	fb: FormBuilder,
  	private router: Router,
    private dialogService: DialogService,
  	private emailService: EmailService,
    private flashMessagesService: FlashMessagesService) {
      this.number_of_search_result = 2;
      this.seekersData = [{
        seeker_name: "Tolik F.",
        seeker_title: "Web Developer",
        seeker_overview: "Over 15 years of work, I built more than 40 useful web sites and apps. I am a senior web developer and always responsible for both backend and front-end using Ruby on Rails, Node, Angular JS and React JS. My clients and teammates always say that they are happy and love working with me cause of kindness and skills."
      },{
        seeker_name: "Monst F.",
        seeker_title: "Builder",
        seeker_overview: "Over 15 years of work, I built more than 40 useful web sites and apps. I am a senior web developer and always responsible for both backend and front-end using Ruby on Rails, Node, Angular JS and React JS. My clients and teammates always say that they are happy and love working with me cause of kindness and skills."        
      }];
  }

  ngOnInit() {
  }
  SearchSeekers(){
    console.log("search seekers");
  }
}
