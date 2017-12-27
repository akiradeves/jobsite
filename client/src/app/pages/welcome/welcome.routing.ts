import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './welcome.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
	// {
	// 	path: 'identify',
	// 	component: WelcomeComponent,
	// 	loadChildren: 'app/pages/identify/identify.module#IdentifyModule',
	// },
	// {
	// 	path: 'enroll',
	// 	component: WelcomeComponent,
	// 	loadChildren: 'app/pages/enroll/enroll.module#EnrollModule',
	// },
	// {
	// 	path: 'verify',
	// 	component: WelcomeComponent,
	// 	loadChildren: 'app/pages/verify/verify.module#VerifyModule',
	// },
	{
		path: '',
		component: WelcomeComponent
	}
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);