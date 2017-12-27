import { Routes, RouterModule }  from '@angular/router';

import { GroupsComponent } from './groups.component';
import { ModuleWithProviders } from '@angular/core';

import { ListgroupsComponent } from './listgroups/listgroups.component';
import { AddgroupComponent } from './addgroup/addgroup.component';
import { AddmemberComponent } from './addmember/addmember.component';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
  	path: '',
  	component:  ListgroupsComponent
  },
  {
  	path: 'add',
  	component: AddgroupComponent
  },
  {
  	path: 'addmember/:groupid',
  	component: AddmemberComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
