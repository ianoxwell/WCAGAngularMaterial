import { Observable } from 'rxjs';

/** Generic dictionary key/values */
export interface IDictionary<T> {
	[Key: string]: T;
}

/**
 * Paged result returned from the api for lists.
 */
export interface IPagedResult<T> {
	items: T[];
	totalCount: number;
}

/**
 * Class to generate a blank Paged Result.
 */
export class PagedResult<T> implements IPagedResult<T> {
	items = [];
	totalCount = 0;
}

/**
 * Can the component deactivate.
 */
export interface CanComponentDeactivate {
	canDeactivate: () => Observable<boolean> | boolean;
}

/**
 * Base model to support common items from api.
 */
export interface IBaseModel {
	id: number;
	createdBy?: string;
	createdAt?: Date;
	lastModifiedBy?: string;
	lastModifiedAt?: Date;
	rowVer?: string;
}
