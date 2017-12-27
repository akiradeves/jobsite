import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { DialogService } from 'ng2-bootstrap-modal';
import { ConfirmModalComponent } from '../../../components/confirm-modal/confirm-modal.component';

import { environment } from '../../../../environments/environment';
import { GroupsService } from '../../../services/groups.service';

@Component({
  selector: 'app-addgroup',
  templateUrl: './addgroup.component.html',
  styleUrls: ['./addgroup.component.css']
})
export class AddgroupComponent implements OnInit {

	public form: FormGroup;
  public name: AbstractControl;

  constructor(fb:FormBuilder,
  	private router: Router,
  	private dialogService: DialogService,
    private groupsService: GroupsService,
    private flashMessagesService: FlashMessagesService) {

  	this.form = fb.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(1)])]
    });

    this.name = this.form.controls['name'];
  }

  submitForm(values: Object) {
    if (this.form.valid) {

      const group = {
        name: this.name.value
      };

      this.groupsService.add(group).subscribe(data => {
        // If not success
        if (!data.success) {
          this.flashMessagesService.show(data.message, { timeout:1900, cssClass: 'alert-danger flashfade' });
        } else {
          this.flashMessagesService.show("Added group succesfully.", { timeout:1900, cssClass: 'alert-info flashfade' });
          setTimeout(() => {
            this.router.navigate(['/pages/groups']);
          }, 2000);
        }
      });
    } else {
      this.flashMessagesService.show("Please input data correctly.", { timeout:1900, cssClass: 'alert-danger flashfade' });
    }
  }

  ngOnInit() {
  }

  public onSubmit(values: Object):void {
    // Open confirm dialog
    let disposable = this.dialogService.addDialog(
      ConfirmModalComponent,
      {
        title: 'Add group',
        message: 'Are you sure to add a group with input data?'
      }).subscribe((isConfirmed) => {
        if (isConfirmed) { // If confirmed
          this.submitForm(values);
        }
      });
  }
}
