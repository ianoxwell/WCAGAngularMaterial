import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
	name: 'errorkeys'
})
export class ErrorkeysPipe implements PipeTransform {
	/**
	 * Gets keys from the ValidationError object.
	 * @param errors ValidationErrors object.
	 * @returns string array of error keys, e.g. ['required'].
	 */
	transform(errors: ValidationErrors | null | undefined): string[] {
		return !!errors ? Object.keys(errors) : [];
	}
}
