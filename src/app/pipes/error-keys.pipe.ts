import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
	name: 'errorkeys'
})
export class ErrorkeysPipe implements PipeTransform {
	transform(errors: ValidationErrors | null | undefined, args?: any): any {
		return !!errors ? Object.keys(errors) : [];
	}
}
