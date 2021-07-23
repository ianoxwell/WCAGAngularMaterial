import { Directive, HostBinding } from '@angular/core';

@Directive({
	selector: 'a'
})
export class ALinkDirective {
	@HostBinding('class') elementClass = ' mat-focus-indicator';
	constructor() {}
}
