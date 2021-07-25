import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, Input, OnDestroy } from '@angular/core';
import { PageTitleService } from '@services/page-title.service';
import { Observable, timer } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
	selector: 'app-loading-indicator',
	templateUrl: './loading-indicator.component.html',
	styleUrls: ['./loading-indicator.component.scss']
})
export class LoadingIndicatorComponent implements OnDestroy {
	@Input() fullSpinner = true; // used to determine the spinner class applied
	@Input() pageLoadedAltText = '';
	@Input() backgroundOpacity = false;
	@Input() dataLoadingText: string[] = [
		'Please wait, data loading.',
		'Please wait, data is still loading.',
		'Thank you for your patience.',
		'Seems to be taking a while.',
		'Can you try refreshing your browser?'
	];
	@Input() dueTime = 500;
	@Input() periodDelay = 3500;

	/**
	 * Note that this is subscribed to using the async pattern in the template,
	 * Therefore it does not need to be unsubscribed.
	 */
	loadingWait$: Observable<string> = timer(this.dueTime, this.periodDelay).pipe(
		take(this.dataLoadingText.length),
		map((i: number) => {
			void this.liveAnnouncer.announce(this.dataLoadingText[i]);
			return this.dataLoadingText[i];
		})
	);

	constructor(private liveAnnouncer: LiveAnnouncer, private pageTitleService: PageTitleService) {}

	/**
	 * On Destroy of the loading indicator (load complete), then the page to announce that data loading is complete.
	 */
	ngOnDestroy(): void {
		const loadedText: string =
			this.pageLoadedAltText !== ''
				? this.pageLoadedAltText
				: `Data loaded, showing contents for page, ${this.pageTitleService.getTitle()}`;
		void this.liveAnnouncer.announce(loadedText);
	}
}
