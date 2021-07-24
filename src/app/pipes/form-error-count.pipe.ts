import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';

@Pipe({
	name: 'formErrorCount',
	pure: false
})
export class FormErrorCountPipe implements PipeTransform {

	transform(value: AbstractControl | null, isFormSubmitted: boolean): number {
		return this.getErrorCount(value, isFormSubmitted);
	}

	/**
	 * Recursively go through the angular control (form control, form group or form array) to get an error count.
	 *
	 * Error(s) will only be counted if either the form has been submitted or
	 * the form group, form control and form array has been touched.
	 *
	 * @param control - angular control.
	 */
	private getErrorCount(controlToLookAt: AbstractControl | null, isFormSubmitted: boolean): number {
		if (controlToLookAt instanceof FormControl) {
			return this.getErrorCountFromObject(controlToLookAt, isFormSubmitted);
		} else if (controlToLookAt instanceof FormGroup) {
			const groupCount = this.getErrorCountFromObjectForGroup(controlToLookAt, isFormSubmitted);

			const subControlCount = Object.keys(controlToLookAt.controls)
				.map(fieldName => controlToLookAt.get(fieldName))
				.map(fieldControl => this.getErrorCount(fieldControl, isFormSubmitted))
				.reduce((total, increase) => total + increase, 0);

			return groupCount + subControlCount;

		} else if (controlToLookAt instanceof FormArray) {
			const arrayCount = this.getErrorCountFromObject(controlToLookAt, isFormSubmitted);

			const subControlCount = controlToLookAt.controls
				.map(arrayControl => this.getErrorCount(arrayControl, isFormSubmitted))
				.reduce((total, increase) => total + increase, 0);
			return arrayCount + subControlCount;
		}
		return 0;
	};

	private getAssociatedControlNames(error: { associatedControl?: string | string[] }): string[] {
		if (typeof error.associatedControl === 'string') {
			return [error.associatedControl];
		} else if (error.associatedControl instanceof Array) {
			return error.associatedControl;
		} else {
			return [];
		}
	}

	// Check whether any of the associated controls have been touched or not.
	// Please note were going to count this as 1 error despite having this error potential
	// be mapped against more than 1 control.
	private isAssociatedControlTouched(objectToLookAt: FormGroup, f: string): boolean {
		const error = objectToLookAt.getError(f);
		const associatedControlNames = this.getAssociatedControlNames(error);
		const isAnyTouched = associatedControlNames.some(controlName => objectToLookAt.get(controlName)?.touched);
		return isAnyTouched;
	}

	// Get number of errors for a form group by checking whether the form is submitted or the the associated control(s)
	// for that error has been touched or not.
	private getErrorCountFromObjectForGroup(objectToLookAt: FormGroup, isFormSubmitted: boolean): number {
		if (!this.areErrorsVisible(objectToLookAt, isFormSubmitted)) {
			// No errors are visible.
			return 0;
		} else if (isFormSubmitted && objectToLookAt.errors) {
			// All errors are visible.
			return Object.keys(objectToLookAt.errors).length;
		} else {
			// Work out which errors to display based on whether the associated controls are touched.
			return objectToLookAt.errors ? Object.keys(objectToLookAt.errors)
				.filter(f => objectToLookAt.getError(f).associatedControl)
				.filter(f => this.isAssociatedControlTouched(objectToLookAt, f))
				.length : 0;
		}
	}

	// Get number of errors for a form control, group and array.
	private getErrorCountFromObject(objectToLookAt: AbstractControl | null, isFormSubmitted: boolean): number {
		return this.areErrorsVisible(objectToLookAt, isFormSubmitted) && objectToLookAt?.errors ? Object.keys(objectToLookAt.errors).length : 0;
	}

	private areErrorsVisible(objectToLookAt: AbstractControl | null, isFormSubmitted: boolean): boolean {
		return !!objectToLookAt?.errors && (isFormSubmitted || objectToLookAt?.touched);
	}
}
