import { Routes, RouterModule } from '@angular/router';

import { SeekerSearchComponent } from './seekersearch.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
	{
		path: '',
		component: SeekerSearchComponent
	}
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);