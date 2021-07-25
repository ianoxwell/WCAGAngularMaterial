import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { StateService } from '@services/state.service';
import { autoSpy, Spy } from '@tests/auto-spy';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
	let component: HeaderComponent;
	let fixture: ComponentFixture<HeaderComponent>;

	const stateServiceSpy: Spy<StateService> = autoSpy(StateService);
	stateServiceSpy.toggleTheme.and.returnValue(true);

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				RouterTestingModule,
				MatMenuModule,
				MatIconModule,
				MatToolbarModule,
				MatInputModule,
				MatDividerModule,
				NoopAnimationsModule,
				MatButtonModule
			],
			declarations: [HeaderComponent],
			providers: [{ provide: StateService, useValue: stateServiceSpy }]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(HeaderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should toggle the theme', () => {
		component.isDarkTheme = false;
		component.toggleTheme();

		expect(component.isDarkTheme).toBeTrue();
	});
});
