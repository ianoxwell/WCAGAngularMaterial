import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
	template: ''
})
export class ComponentBase implements OnDestroy {
	ngUnsubscribe: Subject<void> = new Subject();

	ngOnDestroy(): void {
		this.destroySubscriptions();
	}

	destroySubscriptions(): void {
		this.ngUnsubscribe.next();
		this.ngUnsubscribe.complete();
	}
}
