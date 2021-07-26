import { Component } from '@angular/core';
import { MessageStatus } from '@models/message.model';
import { MessageService } from '@services/message.service';

@Component({
	selector: 'app-basic-layout',
	templateUrl: './basic-layout.component.html',
	styleUrls: ['./basic-layout.component.scss']
})
export class BasicLayoutComponent {
	constructor(private messageService: MessageService) {}

	/**
	 * Short method to display a token toast.
	 */
	showMessage(): void {
		this.messageService.add({ severity: MessageStatus.Success, summary: 'Message success', life: 8000 });
	}

	/**
	 * Clears any active messages in the message cue.
	 */
	clearMessages(): void {
		this.messageService.clear();
	}
}
