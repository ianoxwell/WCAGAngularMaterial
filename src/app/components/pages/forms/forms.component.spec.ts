import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SaveButtonComponent } from '@components/save-button/save-button.component';
import { ErrorkeysPipe } from '@pipes/error-keys.pipe';
import { MessageService } from '@services/message.service';
import { autoSpy, Spy } from '@tests/auto-spy';
import { RequiredValidator } from '@validators/required.validator';
import { MockComponent, MockPipe } from 'ng-mocks';
import { FormsComponent } from './forms.component';

describe('FormsComponent', () => {
	let component: FormsComponent;
	let fixture: ComponentFixture<FormsComponent>;

	const messageServiceSpy: Spy<MessageService> = autoSpy(MessageService);

	const successfulForm = {
		name: 'Bob Shoe',
		email: 'bob@bob.com',
		mobile: '0422 111 345',
		address: '11 Not here Street',
		state: 'WA',
		description: ''
	};

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ReactiveFormsModule, MatCardModule, MatInputModule, MatFormFieldModule, MatSelectModule, NoopAnimationsModule],
			declarations: [FormsComponent, MockPipe(ErrorkeysPipe), MockComponent(SaveButtonComponent)],
			providers: [RequiredValidator, { provider: MessageService, useValue: messageServiceSpy }]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(FormsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('form', () => {
		beforeEach(() => {
			component.form = component.createForm();
			messageServiceSpy.add.and.returnValue();
		});

		it('should be pristine and untouched, but not valid on creation', () => {
			expect(component.form.pristine).toBeTrue();
			expect(component.form.untouched).toBeTrue();
			expect(component.form.valid).toBeFalse();
		});

		it('should have errors on clean submission', () => {
			component.submitForm();
			const errorList: string[] = component.getListErrors();
			expect(component.form.getError('required', 'name')).toBeTrue();
			expect(errorList.length).toBeGreaterThan(2);
		});

		it('should show a success message on full form being complete', () => {
			component.form.setValue(successfulForm);
			component.submitForm();
			const errorList: string[] = component.getListErrors();

			expect(component.form.valid).toBeTrue();
			expect(errorList.length).toEqual(0);
		});

		it('should reset the form', () => {
			component.form.setValue(successfulForm);
			let testerName: FormControl = component.form.get('name') as FormControl;

			expect(component.form.valid).toBeTrue();
			expect(testerName.value).toEqual(successfulForm.name);
			component.resetForm();

			testerName = component.form.get('name') as FormControl;

			expect(component.form.valid).toBeFalse();
			expect(testerName.value).toBeNull();
		});
	});
});
