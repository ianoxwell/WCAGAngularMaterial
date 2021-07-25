/** Extension to strongly type ValidationErrors.errorObj */
export interface ValidationErrorObject {
	min?: number;
	max?: number;
	requiredLength?: number;
	actualLength?: number;
	message?: string;
}
