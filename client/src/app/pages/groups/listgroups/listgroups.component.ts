import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { DialogService } from 'ng2-bootstrap-modal';
import { ConfirmModalComponent } from '../../../components/confirm-modal/confirm-modal.component';
import { AuthService } from '../../../services/auth.service';
import { GroupsService } from '../../../services/groups.service';

import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-listgroups',
  templateUrl: './listgroups.component.html',
  styleUrls: ['./listgroups.component.css']
})
export class ListgroupsComponent implements OnInit {

	data;
	title = 'Groups';
	
  s3bucket = environment.s3bucket;

  constructor(
    private router: Router,
    private authService: AuthService,
    private groupsService: GroupsService,
    private dialogService: DialogService,
    private flashMessagesService: FlashMessagesService) {
  	this.reloadData();
  }

  ngOnInit() {
  }

  // Function to load all user data
  reloadData() {
    this.groupsService.getMine().subscribe(data => {
      if (data.success) {
        this.data = data.groups;
        for (let group of this.data) {
          for (let user of group.members) {
            if (user.photo) {
              user.photoUrl = 'https://' + this.s3bucket + '.s3.amazonaws.com/profile_' + user._id;
            } else {
              user.photoUrl = 'assets/img/profile.png';
            }
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

  // Function to remove a user
  public remove(item) {
    // Open confirm dialog
    let disposable = this.dialogService.addDialog(
      ConfirmModalComponent,
      {
        title: 'Remove group',
        message: 'Are you sure to remove a group?'
      }).subscribe((isConfirmed) => {
        if (isConfirmed) { // If confirmed
          this.groupsService.remove(item).subscribe(res => {
            // Check if it is success
            if (res.success) {
              this.flashMessagesService.show('Removed group successfully.', { timeout:1900, cssClass: 'alert-info flashfade' });
              this.reloadData();
            } else {
              this.flashMessagesService.show(res.message, { timeout:1900, cssClass: 'alert-danger flashfade' });
            }
          });
        }
      });
  }
}
