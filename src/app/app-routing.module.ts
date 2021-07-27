import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicLayoutComponent } from '@components/pages/basic-layout/basic-layout.component';
import { FormsComponent } from '@components/pages/forms/forms.component';
import { TablesComponent } from '@components/pages/tables/tables.component';

const routes: Routes = [
	{
		path: 'forms',
		component: FormsComponent,
		data: { title: `Angular Material WCAG Forms Demo` }
	},
	{
		path: 'tables',
		component: TablesComponent,
		data: { title: `Angular Material WCAG Table Demo` }
	},
	{
		path: '',
		component: BasicLayoutComponent,
		data: { title: `Angular Material WCAG Basic Layout Demo` }
	},
	{
		path: '**',
		redirectTo: ''
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
