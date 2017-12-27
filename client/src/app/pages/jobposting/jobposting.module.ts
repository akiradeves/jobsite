import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { JobPostingComponent } from './jobposting.component';
import { routing } from './jobposting.routing';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FlashMessagesModule,
    routing
  ],
  declarations: [JobPostingComponent],
  providers: [
  ]
})

export class JobPostingModule { }
