import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { WelcomeComponent } from './welcome.component';
import { routing } from './welcome.routing';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FlashMessagesModule,
    routing
  ],
  declarations: [WelcomeComponent],
  providers: [
  ]
})

export class WelcomeModule { }
