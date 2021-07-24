import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { CloseMessage, Message, MessageStatus } from '@models/message.model';

@Component({
	selector: 'app-toast-item',
	templateUrl: './toast-item.component.html',
	styleUrls: ['../toast.component.scss'],
	animations: [
		trigger('messageState', [
			state(
				'visible',
				style({
					transform: 'translateY(0)',
					opacity: 1
				})
			),
			transition('void => *', [style({ transform: 'translateY(100%)', opacity: 0 }), animate('{{showTransitionParams}}')]),
			transition('* => void', [
				animate(
					'{{hideTransitionParams}}',
					style({
						height: 0,
						opacity: 0,
						transform: 'translateY(-100%)'
					})
				)
			])
		])
	]
})
export class ToastItemComponent implements AfterViewInit, OnDestroy {
	@Input() message: Message = { severity: MessageStatus.Information };

	@Input() index = 0;

	@Input() showTransitionOptions = '';

	@Input() hideTransitionOptions = '';

	@Output() closeToast: EventEmitter<CloseMessage> = new EventEmitter();

	@ViewChild('container', { static: false }) containerViewChild!: ElementRef;

	messageStatus = MessageStatus;

	timeout: any;

	/** LifeCycle event after the view has been initialised. */
	ngAfterViewInit() {
		this.initTimeout();
	}

	/**
	 * Initialises the timeout based on the message Life.
	 * TODO modify to RXJS.
	 */
	initTimeout(): void {
		if (!this.message.sticky) {
			this.timeout = setTimeout(() => {
				this.closeToast.emit({
					index: this.index,
					message: this.message
				});
			}, this.message.life || 3000);
		}
	}

	/** Clears any existing timeouts. */
	clearTimeout(): void {
		if (this.timeout) {
			clearTimeout(this.timeout);
			this.timeout = null;
		}
	}

	/** Dom event triggered by mouse enter. */
	onMouseEnter(): void {
		this.clearTimeout();
	}

	/** Dom event triggered by mouse leaving. */
	onMouseLeave(): void {
		this.initTimeout();
	}

	/** Dom event triggered by clicking on close icon. */
	onCloseIconClick(event: MouseEvent | Event) {
		this.clearTimeout();

		this.closeToast.emit({
			index: this.index,
			message: this.message
		});

		event.preventDefault();
	}

	ngOnDestroy() {
		this.clearTimeout();
	}

	/**
	 * Sets the material icon related to the message status / severity.
	 * @param severity enum of the message severity.
	 * @returns string of the material icon to use.
	 */
	getIconName(severity: MessageStatus): string {
		switch (severity) {
			case 'error':
				return 'error_outline';
			case 'warning':
				return 'warning';
			case 'alert':
				return 'add_alert';
			case 'critical':
				return 'error';
			case 'success':
				return 'done';
			default:
				return '';
		}
	}
}
