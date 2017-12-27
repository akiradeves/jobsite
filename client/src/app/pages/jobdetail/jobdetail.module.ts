import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { JobDetailComponent } from './jobdetail.component';
import { routing } from './jobdetail.routing';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FlashMessagesModule,
    routing
  ],
  declarations: [JobDetailComponent],
  providers: [
  ]
})

export class JobDetailModule { }
