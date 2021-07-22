import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'app-save-button',
	templateUrl: './save-button.component.html',
	styleUrls: ['./save-button.component.scss']
})
export class SaveButtonComponent {
	@Input() dirty = true;
	@Input() valid = true;
	@Input() isSaving = false;
	@Input() color = 'primary';
	@Input() label = 'Save';

	@Input() iconName = 'cloud_done';
	@Input() iconPosition: 'left' | 'right' = 'left';
	@Output() save = new EventEmitter<void>();
}
