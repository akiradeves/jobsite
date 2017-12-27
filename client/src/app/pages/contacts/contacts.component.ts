import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})

export class ContactsComponent implements OnInit {

	title = 'Contacts';
  data;
  filterQuery = "";

  s3bucket = environment.s3bucket;

  constructor(private router: Router,
    private authService: AuthService,
    private usersService: UsersService) { 
      this.reloadData();
  }

  ngOnInit() {
  }
  
  // Function to load all user data
  reloadData() {
    this.usersService.getAll().subscribe(data => {
      if (data.success) {
        this.data = data.users;
        for (let user of this.data) {
          if (user.photo) {
            user.photoUrl = 'https://' + this.s3bucket + '.s3.amazonaws.com/profile_' + user._id;
          } else {
            user.photoUrl = 'assets/img/profile.png';
          }
        }
      } else {
        if (data.is_token_error) {
          this.authService.logout();
          this.router.navigate(['/login']);
        }
      }
    });
  }
  
}
