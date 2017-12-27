import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { PagesComponent } from './pages.component';
import { AuthGuard } from '../guards/auth.guard';
import { NotAuthGuard } from '../guards/not-auth.guard';

export const routes: Routes = [
	{
		path: 'login',
		component: PagesComponent,
		loadChildren: 'app/pages/login/login.module#LoginModule',
		canActivate: [NotAuthGuard]
	},
	{
		path: 'register',
		component: PagesComponent,
		loadChildren: 'app/pages/register/register.module#RegisterModule',
		canActivate: [NotAuthGuard]
	},
	{
		path: 'contact',
		component: PagesComponent,
		loadChildren: 'app/pages/contact/contact.module#ContactModule'
	},
	{
		path: 'welcome',
		component: PagesComponent,
		loadChildren: 'app/pages/welcome/welcome.module#WelcomeModule',
	},
	{
		path: 'jobsearch',
		component: PagesComponent,
		loadChildren: 'app/pages/jobsearch/jobsearch.module#JobSearchModule',
	},
	{
		path: 'seekersearch',
		component: PagesComponent,
		loadChildren: 'app/pages/seekersearch/seekersearch.module#SeekerSearchModule',
	},
	{
		path: 'jobposting',
		component: PagesComponent,
		loadChildren: 'app/pages/jobposting/jobposting.module#JobPostingModule',
	},
	{
		path: 'jobdetail',
		component: PagesComponent,
		loadChildren: 'app/pages/jobdetail/jobdetail.module#JobDetailModule',
	},
	{
		path: 'pages',
		component: PagesComponent,
		children: [
			// { path: '', redirectTo: 'contacts', pathMatch: 'full' },
			// { path: 'contacts', loadChildren: './contacts/contacts.module#ContactsModule' },
			// { path: 'groups', loadChildren: './groups/groups.module#GroupsModule' },
		],
		canActivate: [AuthGuard]
	}
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);