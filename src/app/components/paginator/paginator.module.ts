import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCommonModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { PaginatorComponent } from './paginator.component';

@NgModule({
	imports: [CommonModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatSelectModule, MatCommonModule, MatIconModule],
	declarations: [PaginatorComponent],
	exports: [PaginatorComponent],
	providers: []
})
export class PaginatorModule {}
