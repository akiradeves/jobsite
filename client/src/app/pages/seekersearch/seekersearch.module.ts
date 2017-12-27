import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { SeekerSearchComponent } from './seekersearch.component';
import { routing } from './seekersearch.routing';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FlashMessagesModule,
    routing
  ],
  declarations: [SeekerSearchComponent],
  providers: [
  ]
})

export class SeekerSearchModule { }
