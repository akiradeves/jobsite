import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { DialogService } from 'ng2-bootstrap-modal';
import { UsersService } from '../../../services/users.service';
import { ConfirmModalComponent } from '../../../theme/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-listusers',
  templateUrl: './listusers.component.html',
  styleUrls: ['./listusers.component.scss']
})
export class ListusersComponent implements OnInit {

	data;
  filterQuery = "";
  rowsOnPage = 10;
  sortBy = "email";
  sortOrder = "asc";

  constructor(private router: Router,
    private usersService: UsersService,
    private dialogService: DialogService,
    private flashMessagesService: FlashMessagesService) { 
    this.reloadData();
  }

  ngOnInit() {
    
  }

  // Function to load all user data
  reloadData() {
    this.usersService.getAll().subscribe(data => {
      this.data = data.users;
    });
  }

  // Function to go to add a user page
  public gotoAddPage() {
    
  }

  // Function to remove a user
  public remove(item) {
    // Open confirm dialog
    let disposable = this.dialogService.addDialog(
      ConfirmModalComponent,
      {
        title: 'Remove user',
        message: 'Are you sure to remove a user?'
      }).subscribe((isConfirmed) => {
        if (isConfirmed) { // If confirmed
          this.usersService.remove(item).subscribe(res => {
            // Check if it is success
            if (res.success) {
              this.flashMessagesService.show('Removed user successfully.', { cssClass: 'alert-info' });
              this.reloadData();
            } else {
              this.flashMessagesService.show(res.message, { cssClass: 'alert-danger' });
            }
          });
        }
      });
  }
}
