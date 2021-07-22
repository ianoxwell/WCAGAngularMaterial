import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PageTitleService } from '@services/page-title.service';
import { autoSpy, Spy } from '@tests/auto-spy';
import { PageTitleComponent } from './page-title.component';

describe('PageTitleComponent', () => {
	let component: PageTitleComponent;
	let fixture: ComponentFixture<PageTitleComponent>;

	const pageTitleServiceSpy: Spy<PageTitleService> = autoSpy(PageTitleService);

	beforeEach(
		waitForAsync(() => {
			TestBed.configureTestingModule({
				declarations: [PageTitleComponent],
				providers: [{ provide: PageTitleService, useValue: pageTitleServiceSpy }]
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(PageTitleComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
