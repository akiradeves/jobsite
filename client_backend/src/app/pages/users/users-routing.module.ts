import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListusersComponent } from './listusers/listusers.component';
import { AdduserComponent } from './adduser/adduser.component';
import { EdituserComponent } from './edituser/edituser.component';

const routes: Routes = [
	{
		path: '',
		component: ListusersComponent
	},
	{
		path: 'add',
		component: AdduserComponent
	},
	{
		path: 'edit/:id',
		component: EdituserComponent
	}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
