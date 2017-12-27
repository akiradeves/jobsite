import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { DialogService } from 'ng2-bootstrap-modal';
import { ConfirmModalComponent } from '../../../components/confirm-modal/confirm-modal.component';
import { AuthService } from '../../../services/auth.service';
import { UsersService } from '../../../services/users.service';
import { GroupsService} from '../../../services/groups.service';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-addmember',
  templateUrl: './addmember.component.html',
  styleUrls: ['./addmember.component.css']
})
export class AddmemberComponent implements OnInit {
  title = "Group Members";
	data;
	urlParams;
  group;

  s3bucket = environment.s3bucket;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialogService: DialogService,
    private authService: AuthService,
    private usersService: UsersService,
    private groupsService: GroupsService,
    private flashMessagesService: FlashMessagesService) {
  	this.reloadData();
  }

  ngOnInit() {
  }

  // Function to load all user data
  reloadData() {  
    this.urlParams = this.activatedRoute.snapshot.params;

    this.groupsService.get(this.urlParams.groupid).subscribe(ret => {
      if (ret.success) {
        this.group = ret.group;
        this.usersService.getAll().subscribe(data => {
        this.data = data.users;
          for (let user of this.data) {
            user.selected = this.group.members.indexOf(user._id) > -1;
            if (user.photo) {
              user.photoUrl = 'https://' + this.s3bucket + '.s3.amazonaws.com/profile_' + user._id;
            } else {
              user.photoUrl = 'assets/img/profile.png';
            }
          }
        });  
      } else {
        if (ret.is_token_error) {
          this.authService.logout();
          this.router.navigate(['/login']);
        }
      }
    });
  }

  public onFinish() {
    // Open confirm dialog
    let disposable = this.dialogService.addDialog(
      ConfirmModalComponent,
      {
        title: 'Add members',
        message: 'Are you sure to add change the members in the group?'
      }).subscribe((isConfirmed) => {
        if (isConfirmed) { // If confirmed
          this.submitChange();
        }
      });
  }

  public onSelect(user) {
    user.selected = !user.selected;
  }

  submitChange() {
    this.group.members = [];
    for (let user of this.data) {
      if (user.selected) {
        this.group.members.push(user);
      }
    }

    this.groupsService.edit(this.group).subscribe(data => {
      // If not success
      if (!data.success) {
        this.flashMessagesService.show(data.message, { timeout:1900, cssClass: 'alert-danger flashfade' });
      } else {
        this.flashMessagesService.show("Saved group succesfully.", { timeout:1900, cssClass: 'alert-info flashfade' });
        setTimeout(() => {
          this.router.navigate(['/pages/groups']);
        }, 2000);
      }
    });
  }
}
