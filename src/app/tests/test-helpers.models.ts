import { ISortPageObj } from '@models/common.model';

export const fakeEmptyFilterParams: ISortPageObj = {
	sort: 'id',
	order: 'asc',
	pageIndex: 0,
	pageSize: 25
};
export const fakeSortFilterParams: ISortPageObj = {
	sort: 'name',
	order: 'desc',
	pageIndex: 0,
	pageSize: 25
};

export const fakeDisplayedColumns: string[] = ['Id', 'Code', 'Title', 'StartDate', 'EndDate', 'SortOrder', 'CreatedAt', 'actions'];
