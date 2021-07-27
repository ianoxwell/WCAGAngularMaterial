import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingIndicatorComponent } from './loading-indicator.component';

@NgModule({
	imports: [CommonModule, MatProgressSpinnerModule, MatIconModule],
	declarations: [LoadingIndicatorComponent],
	exports: [LoadingIndicatorComponent]
})
export class LoadingIndicatorModule {}
