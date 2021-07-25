import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { MessageStatus } from '@models/message.model';
import { MessageService } from '@services/message.service';
import { RequiredValidator } from '@validators/required.validator';

@Component({
	selector: 'app-forms',
	templateUrl: './forms.component.html',
	styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit, AfterViewInit {
	form: FormGroup = {} as FormGroup;
	@ViewChild('stateSelectCombo', { static: false }) stateSelectCombo: MatSelect | undefined;

	states = [
		{ title: 'Australian Capital Territory', value: 'ACT' },
		{ title: 'Northern Territory', value: 'NT' },
		{ title: 'Queensland', value: 'QLD' },
		{ title: 'South Australian', value: 'SA' },
		{ title: 'Tasmania', value: 'TAS' },
		{ title: 'Victoria', value: 'VIC' },
		{ title: 'Western Australia', value: 'WA' }
	];
	constructor(private fb: FormBuilder, private required: RequiredValidator, private messageService: MessageService) {}

	ngOnInit(): void {
		this.form = this.createForm();
	}

	ngAfterViewInit(): void {
		this.setFakeAriaControl(false);
	}

	/**
	 * Sets a fake value on the aria-controls for the mat-select.
	 * Note this is VERY Hacky and very poor practice!!
	 * Also Note that the detection tool is meant to change to reflect recent changes
	 *  - https://github.com/dequelabs/axe-core/issues/2505
	 *  - https://github.com/angular/components/pull/20082
	 * @param open boolean to find out when the mat-select has been closed.
	 */
	setFakeAriaControl(open: boolean): void {
		if (!open && !!this.stateSelectCombo) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
			this.stateSelectCombo._elementRef.nativeElement.setAttribute('aria-controls', 'fakeBox');
		}
	}

	get emailErrors(): ValidationErrors {
		return this.form.get('email')?.errors as ValidationErrors;
	}
	/**
	 * Creates the form and applies validators to relevant form fields.
	 * @returns The created form group.
	 */
	createForm(): FormGroup {
		return this.fb.group({
			name: ['', this.required.required],
			email: [
				'',
				[
					this.required.required,
					Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
					Validators.minLength(4),
					Validators.maxLength(100)
				]
			],
			mobile: ['', [this.required.required, Validators.pattern('[- +()0-9]+'), Validators.minLength(8), Validators.maxLength(14)]],
			address: ['', [this.required.required, Validators.minLength(3), Validators.maxLength(100)]],
			state: ['', this.required.required],
			description: ''
		});
	}

	submitForm(): void {
		this.form.markAllAsTouched();
		this.form.updateValueAndValidity();
		this.messageService.add({ severity: MessageStatus.Success, summary: 'Save button pressed', life: 8000 });

		if (this.form.valid) {
			console.log('valid - ready to proceeding');
		} else {
			console.log('show a bunch of errors.', this.form);
		}
	}

	/**
	 * Resets form by clearing all fields and setting all fields and form as pristine.
	 */
	resetForm(): void {
		this.form.reset();
	}
}
