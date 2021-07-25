import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PageTitleService } from '@services/page-title.service';
import { autoSpy, Spy } from '@tests/auto-spy';
import { LoadingIndicatorComponent } from './loading-indicator.component';

describe('LoadingIndicatorComponent', () => {
	let component: LoadingIndicatorComponent;
	let fixture: ComponentFixture<LoadingIndicatorComponent>;

	const pageTitleServiceSpy: Spy<PageTitleService> = autoSpy(PageTitleService);

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [MatProgressSpinnerModule, NoopAnimationsModule],
			declarations: [LoadingIndicatorComponent],
			providers: [{ provide: PageTitleService, useValue: pageTitleServiceSpy }]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(LoadingIndicatorComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
