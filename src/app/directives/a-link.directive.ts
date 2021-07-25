import { Directive, HostBinding } from '@angular/core';

@Directive({
	// eslint-disable-next-line @angular-eslint/directive-selector
	selector: 'a'
})
export class ALinkDirective {
	@HostBinding('class') elementClass = ' mat-focus-indicator';
}
