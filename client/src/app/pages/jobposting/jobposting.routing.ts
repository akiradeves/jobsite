import { Routes, RouterModule } from '@angular/router';

import { JobPostingComponent } from './jobposting.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
	{
		path: '',
		component: JobPostingComponent
	}
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);