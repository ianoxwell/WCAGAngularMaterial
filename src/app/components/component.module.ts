import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApplicationPipesModule } from '@pipes/application-pipes.module';
import { MessageService } from '@services/message.service';
import { PageTitleService } from '@services/page-title.service';
import { RequiredValidator } from '@validators/required.validator';
import { CompleteMaterialModule } from '../app-material.module';
import { ALinkDirective } from '../directives/a-link.directive';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LoadingIndicatorComponent } from './loading-indicator/loading-indicator.component';
import { LoadingIndicatorModule } from './loading-indicator/loading-indicator.module';
import { PageTitleComponent } from './page-title/page-title.component';
import { BasicLayoutComponent } from './pages/basic-layout/basic-layout.component';
import { FormsComponent } from './pages/forms/forms.component';
import { MainTableComponent } from './pages/tables/main-table/main-table.component';
import { TablesComponent } from './pages/tables/tables.component';
import { PaginatorModule } from './paginator/paginator.module';
import { SaveButtonModule } from './save-button/save-button.module';
import { ToastComponent } from './toast/toast.component';
import { ToastModule } from './toast/toast.module';

@NgModule({
	imports: [
		CompleteMaterialModule,
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule,
		HttpClientModule,
		ApplicationPipesModule,
		PaginatorModule,
		ToastModule,
		SaveButtonModule,
		LoadingIndicatorModule
	],
	declarations: [
		BasicLayoutComponent,
		FormsComponent,
		TablesComponent,
		MainTableComponent,
		PageTitleComponent,
		ALinkDirective,
		FooterComponent,
		HeaderComponent
	],
	exports: [ToastComponent, FormsComponent, PageTitleComponent, FooterComponent, HeaderComponent, LoadingIndicatorComponent],
	providers: [MessageService, PageTitleService, RequiredValidator]
})
export class ComponentModule {}
