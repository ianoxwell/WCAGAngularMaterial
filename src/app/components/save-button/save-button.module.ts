import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SaveButtonComponent } from './save-button.component';

@NgModule({
	imports: [CommonModule, MatProgressSpinnerModule, BrowserAnimationsModule, MatIconModule, MatButtonModule],
	declarations: [SaveButtonComponent],
	exports: [SaveButtonComponent]
})
export class SaveButtonModule {}
