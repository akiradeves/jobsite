import { Routes, RouterModule }  from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { ContactsComponent } from './contacts.component';
import { ViewcontactComponent } from './viewcontact/viewcontact.component';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: ContactsComponent
  },
  {
  	path: 'view/:id',
  	component: ViewcontactComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
