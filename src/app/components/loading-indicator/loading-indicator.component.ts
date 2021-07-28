import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PageTitleService } from '@services/page-title.service';
import { Observable, of, timer } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
	selector: 'app-loading-indicator',
	templateUrl: './loading-indicator.component.html',
	styleUrls: ['./loading-indicator.component.scss']
})
export class LoadingIndicatorComponent implements OnInit, OnDestroy {
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

	loadingWait$: Observable<string> = of('Please wait, data loading here.');

	constructor(private liveAnnouncer: LiveAnnouncer, private pageTitleService: PageTitleService) {}

	/**
	 * Note that this is subscribed to using the async pattern in the template,
	 * Therefore it does not need to be unsubscribed.
	 */
	ngOnInit(): void {
		this.loadingWait$ = timer(0, this.periodDelay).pipe(
			take(this.dataLoadingText.length),
			map((i: number) => {
				void this.liveAnnouncer.announce(this.dataLoadingText[i]);
				return this.dataLoadingText[i];
			})
		);
	}

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
