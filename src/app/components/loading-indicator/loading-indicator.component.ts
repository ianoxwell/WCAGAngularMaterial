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
	@Input() pageLoadedAltText = 'Page loaded';
	@Input() backgroundOpacity = false;
	dataLoadingText = [
		'Please wait, data loading.',
		'Please wait, data is still loading.',
		'Thank you for your patience.',
		'Seems to be taking a while.',
		'Can you try refreshing your browser?'
	];
	loadingWait$: Observable<string> = timer(500, 3500).pipe(
		take(this.dataLoadingText.length),
		map((i: number) => {
			this.liveAnnouncer.announce(this.dataLoadingText[i]);
			return this.dataLoadingText[i];
		})
	);

	constructor(private liveAnnouncer: LiveAnnouncer, private pageTitleService: PageTitleService) {}

	ngOnDestroy(): void {
		const loadedText: string = this.pageLoadedAltText
			? this.pageLoadedAltText
			: `Data loaded, showing contents for page, ${this.pageTitleService.getTitle()}`;
		this.liveAnnouncer.announce(loadedText);
	}
}
