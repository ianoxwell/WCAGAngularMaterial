import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'formErrorPipe'
})
export class FormErrorMessagePipe implements PipeTransform {
	transform(errorKey: string, errorObj: any): string {
		return this.getErrorMessage(errorKey, errorObj);
	}

	getErrorMessage(errorKey: string, errorObj: any): string {
		let errorMessage = '';

		switch (errorKey) {
			case 'requiredSave':
				errorMessage = 'This field is required to Save';
				break;
			case 'required':
				errorMessage = 'This field is required to Complete';
				break;
			case 'email':
				errorMessage = 'This email address is invalid';
				break;
			case 'pattern':
				errorMessage = 'This email address or phone number is invalid';
				break;
			case 'min':
				errorMessage = `This field does not meet the minimum value of ${errorObj.min}.`;
				break;
			case 'max':
				errorMessage = `This field value exceeds the maximum value of ${errorObj.max}.`;
				break;
			case 'minlength':
				errorMessage = `This field must be at least ${errorObj.requiredLength} characters long.
				Currently it is ${errorObj.actualLength} characters long.`;
				break;
			case 'maxlength':
				errorMessage = `This field cannot exceed ${errorObj.requiredLength} characters long.
				Currently it is ${errorObj.actualLength} characters long.`;
				break;
			case 'matDatepickerParse': // Angular material mat-datepicker component validation
				errorMessage = `Invalid date format.`;
				break;
			case 'matDatepickerFilter': // Angular material mat-datepicker component validation
				errorMessage = `Invalid date.`;
				break;
			case 'futureDated':
				errorMessage = `This field cannot be in the future.`;
				break;
			case 'pastDated':
				errorMessage = `This field cannot be in the past.`;
				break;
			case 'arrayPopulated':
				errorMessage = `This field needs at least one item to complete form.`;
				break;
			default:
				errorMessage = !!errorObj && typeof errorObj === 'object' && errorObj.message ? errorObj.message : 'There is an error.';
		}

		return errorMessage;
	}
}
