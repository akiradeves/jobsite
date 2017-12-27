import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTableModule } from 'angular2-datatable';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { TextMaskModule } from 'angular2-text-mask';
import { NgaModule } from '../../theme/nga.module';
import { ConfirmModalComponent } from '../../theme/components/confirm-modal/confirm-modal.component';

import { UsersRoutingModule } from './users-routing.module';
import { ListusersComponent } from './listusers/listusers.component';
import { UsersService } from '../../services/users.service';
import { GroupsService } from '../../services/groups.service';
import { ListusersfilterPipe } from './listusers/listusersfilter.pipe';
import { AdduserComponent } from './adduser/adduser.component';
import { EdituserComponent } from './edituser/edituser.component';

@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    UsersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    FlashMessagesModule,
    TextMaskModule
  ],
  declarations: [
  	ListusersComponent,
  	ListusersfilterPipe,
  	AdduserComponent,
  	EdituserComponent
  ],
  providers: [
    UsersService,
    GroupsService
  ]
})
export class UsersModule { }
