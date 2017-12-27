import { Routes, RouterModule } from '@angular/router';

import { JobSearchComponent } from './jobsearch.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
	{
		path: '',
		component: JobSearchComponent
	}
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);