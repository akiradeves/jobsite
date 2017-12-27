import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { routing } from './contacts.routing';
import { ContactsComponent } from './contacts.component';

import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';
import { ContactsfilterPipe } from './contactsfilter.pipe';
import { ViewcontactComponent } from './viewcontact/viewcontact.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlashMessagesModule,
    routing
  ],
  declarations: [ContactsComponent, ContactsfilterPipe, ViewcontactComponent],
  providers: [AuthService, UsersService]
})
export class ContactsModule { }
