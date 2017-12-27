import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';

export interface ConfirmModel {
	title: string;
	message: string;
}

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {

	title: string;
	message: string;

  constructor(dialogService: DialogService) { 
  	super(dialogService)
  }

  confirm() {
  	this.result = true;
  	this.close();
  }
}
