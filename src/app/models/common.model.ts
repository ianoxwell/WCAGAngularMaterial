/** Extension to strongly type ValidationErrors.errorObj */
export interface ValidationErrorObject {
	min?: number;
	max?: number;
	requiredLength?: number;
	actualLength?: number;
	message?: string;
}

/** Generic key/values */
export interface IDictionary<T> {
	[Key: string]: T;
}
