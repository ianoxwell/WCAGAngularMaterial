import { Injectable } from '@angular/core';
import { Message } from '@models/message.model';
import { Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class MessageService {
	private messageSource = new Subject<Message | Message[]>();
	private clearSource = new Subject<string>();

	messageObserver = this.messageSource.asObservable();
	clearObserver = this.clearSource.asObservable();

	/** Add a single Message. */
	add(message: Message): void {
		if (message) {
			this.messageSource.next(message);
		}
	}

	/** Add an array of messages */
	addAll(messages: Message[]): void {
		if (messages && messages.length) {
			this.messageSource.next(messages);
		}
	}

	/** Clears source subject. */
	clear(key?: string): void {
		this.clearSource.next(key);
	}
}
