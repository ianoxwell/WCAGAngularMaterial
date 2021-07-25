import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { FooterComponent } from '@components/footer/footer.component';
import { HeaderComponent } from '@components/header/header.component';
import { PageTitleComponent } from '@components/page-title/page-title.component';
import { ToastComponent } from '@components/toast/toast.component';
import { StateService } from '@services/state.service';
import { autoSpy, Spy } from '@tests/auto-spy';
import { MockComponents } from 'ng-mocks';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
	let component: AppComponent;
	let fixture: ComponentFixture<AppComponent>;

	const stateServiceSpy: Spy<StateService> = autoSpy(StateService);
	// stateServiceSpy.getCurrentTheme.and.returnValue(of('light-theme'));

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule, NoopAnimationsModule],
			declarations: [AppComponent, MockComponents(HeaderComponent, PageTitleComponent, FooterComponent, ToastComponent)],
			providers: [{ provider: StateService, useValue: stateServiceSpy }]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(AppComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create the app', () => {
		expect(component).toBeTruthy();
	});

	it('should set the color theme from the state service', () => {
		const applyThemeSpy = spyOn(component, 'applyThemeOnOverlays');

		component.ngOnInit();
		expect(applyThemeSpy).toHaveBeenCalledWith('light-theme');
	});
});
