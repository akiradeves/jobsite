import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { routing } from './groups.routing';
import { GroupsComponent } from './groups.component';
import { ListgroupsComponent } from './listgroups/listgroups.component';
import { AddgroupComponent } from './addgroup/addgroup.component';

import { AuthService } from '../../services/auth.service';
import { GroupsService } from '../../services/groups.service';
import { UsersService } from '../../services/users.service';
import { AddmemberComponent } from './addmember/addmember.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlashMessagesModule,
    routing
  ],
  declarations: 
  [
  	GroupsComponent, 
  	ListgroupsComponent, 
  	AddgroupComponent, AddmemberComponent
  ],
  providers: [
    AuthService,
  	GroupsService,
    UsersService
  ]
})
export class GroupsModule { }
