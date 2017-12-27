import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { JobSearchComponent } from './jobsearch.component';
import { routing } from './jobsearch.routing';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FlashMessagesModule,
    routing
  ],
  declarations: [JobSearchComponent],
  providers: [
  ]
})

export class JobSearchModule { }
