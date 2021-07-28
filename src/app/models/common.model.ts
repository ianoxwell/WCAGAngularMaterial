import { SortDirection } from '@angular/material/sort';

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

/** Sort page object to capture sorting event changes. */
export interface ISortPageObj {
	sort: string;
	order: SortDirection;
	filter?: string;
	pageIndex: number;
	pageSize: number;
}

/** Class of the sortPageObj to enable new SortPageObj(); */
export class SortPageObj implements ISortPageObj {
	sort = 'id';
	order = 'asc' as SortDirection;
	pageIndex = 0;
	pageSize = 25;
}

/** Generic Interface for Paged Results */
export interface IPagedResult<T> {
	items: T[];
	totalCount: number;
}
