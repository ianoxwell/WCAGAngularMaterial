import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MessageService } from '@services/message.service';
import { PageTitleService } from '@services/page-title.service';
import { CompleteMaterialModule } from '../app-material.module';
import { ALinkDirective } from '../directives/a-link.directive';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LoadingIndicatorComponent } from './loading-indicator/loading-indicator.component';
import { PageTitleComponent } from './page-title/page-title.component';
import { PaginatorModule } from './paginator/paginator.module';
import { SaveButtonComponent } from './save-button/save-button.component';
import { ToastItemComponent } from './toast/toast-item/toast-item.component';
import { ToastComponent } from './toast/toast.component';

@NgModule({
	imports: [
		CompleteMaterialModule,
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule,
		HttpClientModule,
		PaginatorModule
	],
	declarations: [
		ToastItemComponent,
		ToastComponent,
		PageTitleComponent,
		ALinkDirective,
		FooterComponent,
		HeaderComponent,
		SaveButtonComponent,
		LoadingIndicatorComponent
	],
	exports: [
		ToastComponent,
		PageTitleComponent,
		FooterComponent,
		HeaderComponent,
		LoadingIndicatorComponent
	],
	providers: [MessageService, PageTitleService]
})
export class ComponentModule {}
