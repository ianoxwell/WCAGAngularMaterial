import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable()
export class RequiredValidator {
	/**
	 * Eslint issue with Validators.required - https://github.com/angular/angular/pull/40044/files
	 * Temp replacement.
	 * @param control Angular Form control.
	 * @returns Validation Error with required as the key.
	 */
	required: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
		return this.isEmptyInputValue(control.value as string) ? { required: true } : null;
	};

	/**
	 * Quick check to see if control is empty.
	 * https://github.com/angular/angular/blob/master/packages/forms/src/validators.ts
	 * @param value value enforced to a string.
	 * @returns boolean true is string is empty.
	 */
	private isEmptyInputValue(value: string): boolean {
		// we don't check for string here so it also works with arrays
		return value == null || value.length === 0;
	}
}
