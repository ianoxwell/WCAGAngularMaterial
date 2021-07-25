import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class PageTitleService {
	defaultTitle: string = environment.appTitle;
	baseTitle: string = environment.baseTitle;
	defaultUrl: string = environment.defaultRoute;
	pageTitleSubject$ = new BehaviorSubject<string>(this.defaultTitle);
	pageUrlSubject$ = new BehaviorSubject<string>('');
	urlHistory: string[] = []; // future provision for go-back button
	pageTitle$ = this.pageTitleSubject$.asObservable();
	pageUrl$ = this.pageUrlSubject$.asObservable();

	constructor(private router: Router, private activeRoute: ActivatedRoute, private title: Title, private liveAnnouncer: LiveAnnouncer) {}

	/**
	 * Listens to the router events for NavigationEnd and sets the page title from the data in app.route.
	 * @returns Observable string of the title.
	 */
	listenPageTitle(): Observable<string> {
		return this.router.events.pipe(
			// only listen for nav end
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			filter((event: any) => {
				return event instanceof NavigationEnd;
			}),
			map((route: NavigationEnd) => {
				const value = this.activeRoute;
				let title: string = value.snapshot.data.title ? (value.snapshot.data.title as string) : this.defaultTitle;
				if (!!value.snapshot.firstChild) {
					title = value.snapshot.firstChild.data.title ? (value.snapshot.firstChild.data.title as string) : this.defaultTitle;
				}
				this.setTitle(title);
				this.urlHistory.push(route.url);
				const url = value.snapshot.routeConfig?.path ? `/${value.snapshot.routeConfig.path}` : this.defaultUrl;
				this.pageUrlSubject$.next(url);
				return title;
			})
		);
	}

	/**
	 * Sets the page Title
	 * @param title The string of the page title from the data field of route
	 */
	setTitle(title: string): void {
		if (!!title && title.length > 0) {
			const fullTitle = `${this.baseTitle}${title}`;
			this.title.setTitle(fullTitle);
			this.pageTitleSubject$.next(fullTitle);
			void this.liveAnnouncer.announce(fullTitle);
		}
	}

	/** Action to announce for screen reader the page title. */
	announceTitle(): void {
		void this.liveAnnouncer.announce(this.title.getTitle());
	}

	/**
	 * Gets the page title.
	 * @return the current page title
	 */
	getTitle(): string {
		return this.title.getTitle();
	}
}
