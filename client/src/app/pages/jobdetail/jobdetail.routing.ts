import { Routes, RouterModule } from '@angular/router';

import { JobDetailComponent } from './jobdetail.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
	{
		path: '',
		component: JobDetailComponent
	}
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);