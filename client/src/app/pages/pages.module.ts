import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './pages.routing';
import { DialogService, BootstrapModalModule } from 'ng2-bootstrap-modal';

import { PagesComponent } from './pages.component';
import { ConfirmModalComponent } from '../components/confirm-modal/confirm-modal.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { FooterComponent } from '../components/footer/footer.component';

import { SharedService } from '../services/shared.service';
@NgModule({
  imports: [
    CommonModule,
    BootstrapModalModule,
    routing
  ],
  declarations: [
  	PagesComponent,
  	NavbarComponent,
    FooterComponent,
    ConfirmModalComponent
  ],
  providers: [
  	SharedService,
  	DialogService
  ],
  entryComponents: [
    ConfirmModalComponent
  ]
})
export class PagesModule { }
