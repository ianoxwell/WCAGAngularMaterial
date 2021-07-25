import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { autoSpy, Spy } from '@tests/auto-spy';
import { ReplaySubject } from 'rxjs';
import { PageTitleService } from './page-title.service';

describe('StateService', () => {
	let service: PageTitleService;

	const eventSubject: ReplaySubject<RouterEvent> = new ReplaySubject<RouterEvent>(1);
	const routerMock = {
		navigate: jasmine.createSpy('navigate'),
		events: eventSubject.asObservable(),
		url: '/tables'
	};
	const liveAnnouncerSpy: Spy<LiveAnnouncer> = autoSpy(LiveAnnouncer);
	liveAnnouncerSpy.announce.and.returnValue(new Promise<void>(() => undefined));

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [
				{ provide: Router, useValue: routerMock },
				{ provide: LiveAnnouncer, useValue: liveAnnouncerSpy },
				{ provide: ActivatedRoute, useValue: { snapshot: { url: 'test', data: { title: 'test2' } } } }
			]
		});
		service = TestBed.inject(PageTitleService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should add to URL history and set new page title', fakeAsync(() => {
		service.urlHistory = [];
		const setTitleSpy = spyOn(service, 'setTitle');
		let pageTitle = 'Initial';
		service.listenPageTitle().subscribe((title: string) => {
			pageTitle = title;
			expect(service.urlHistory.length).toEqual(1);
			expect(setTitleSpy).toHaveBeenCalledWith('test2');
			expect(pageTitle).toEqual('test2');
		});

		eventSubject.next(new NavigationEnd(1, '/auth', '/forms'));
		tick();
	}));

	it('should get the current page title when asked to announce title', () => {
		const getTitleSpy = spyOn(service, 'announceTitle');

		service.announceTitle();
		expect(getTitleSpy).toHaveBeenCalled();
	});

	it('should set the current page title when called', (done: DoneFn) => {
		service.setTitle('test3');
		service.pageTitle$.subscribe((title: string) => {
			expect(title).toEqual('test3');
			done();
		});
	});

	it('should NOT set the page title when string length is 0', (done: DoneFn) => {
		service.setTitle('');
		service.pageTitle$.subscribe((title: string) => {
			expect(title).toEqual(service.defaultTitle);
			done();
		});
	});
});
