import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { StateService } from '@services/state.service';
import { UserService } from '@services/user.service';
import { autoSpy, Spy } from '@tests/auto-spy';
import { of } from 'rxjs';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
	let component: HeaderComponent;
	let fixture: ComponentFixture<HeaderComponent>;

	const userServiceSpy: Spy<UserService> = autoSpy(UserService);
	const stateServiceSpy: Spy<StateService> = autoSpy(StateService);
	userServiceSpy.getIsLoggedIn.and.returnValue(of(true));

	beforeEach(
		waitForAsync(() => {
			TestBed.configureTestingModule({
				imports: [
					RouterTestingModule,
					MatMenuModule,
					MatIconModule,
					MatTooltipModule,
					MatInputModule,
					MatDividerModule,
					NoopAnimationsModule,
					MatButtonModule
				],
				declarations: [HeaderComponent],
				providers: [
					{ provide: UserService, useValue: userServiceSpy },
					{ provide: StateService, useValue: stateServiceSpy }
				]
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(HeaderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
