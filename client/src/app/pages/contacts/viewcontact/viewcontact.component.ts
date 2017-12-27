import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { UsersService } from '../../../services/users.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-viewcontact',
  templateUrl: './viewcontact.component.html',
  styleUrls: ['./viewcontact.component.css']
})
export class ViewcontactComponent implements OnInit {
	data :any = {
  	_id: '',
  	mobile: '',
  	first_name: '',
  	last_name: '',
    email: '',
  	office: '',
  	password: '',
  	role: '',
    photo: false,
    photoUrl: ''
  };
	title = 'Profile';
	urlParams;

	s3bucket = environment.s3bucket;

  constructor(private activatedRoute: ActivatedRoute,
  	private usersService: UsersService,
  	private flashMessagesService: FlashMessagesService) {
  	this.reloadData();
  }

  reloadData() {
  	this.urlParams = this.activatedRoute.snapshot.params;
    this.usersService.get(this.urlParams.id).subscribe(data => {
      // Check if not success
      if (!data.success) {
        this.flashMessagesService.show(data.message, { timeout:1900, cssClass: 'alert-danger flashfade' });
      } else {

        this.data = data.user;

        if (this.data.photo) {
          this.data.photoUrl = 'https://' + this.s3bucket + '.s3.amazonaws.com/profile_' + this.data._id;
        } else {
          this.data.photoUrl = 'assets/img/profile.png';
        }
      }
    });
  }

  ngOnInit() {

  }

}
