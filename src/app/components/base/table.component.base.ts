/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IPagedResult, ISortPageObj, SortPageObj } from '@models/common.model';
import { ComponentBase } from './base.component.base';

@Component({ template: '' })
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class BaseTableComponent<T = any> extends ComponentBase implements OnChanges {
	@Input() data: IPagedResult<T> = { items: [], totalCount: 0 };
	@Input() sortPageObj: ISortPageObj = new SortPageObj();
	@Input() displayedColumns: string[] = [];

	@Output() sortingPageChange = new EventEmitter<SortPageObj>();
	@Output() updateTableRequest = new EventEmitter();

	@ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort = new MatSort();

	dataSource: MatTableDataSource<T>;
	dataLength = 0;

	constructor() {
		super();
		this.dataSource = new MatTableDataSource<T>(this.data?.items);
	}

	/** Default on Change detection */
	ngOnChanges(change: SimpleChanges): void {
		if (!!change.data && !change.data.firstChange) {
			this.dataSource.data = change.data.currentValue.items;
			this.dataLength = change.data.currentValue.totalCount;
		}
	}

	/** Sort change triggered from template. */
	onSortChange(ev: Sort): void {
		this.sortPageObj.sort = ev.active;
		this.sortPageObj.order = ev.direction;
		this.sortPageObj.pageIndex = 0;
		this.sortingPageChange.emit(this.sortPageObj);
	}

	/** Page change triggered from the mat-paginator. */
	onPageChange(pageEvent: PageEvent): void {
		if (pageEvent.pageSize !== this.sortPageObj.pageSize) {
			this.sortPageObj.pageIndex = 0;
			this.sortPageObj.pageSize = pageEvent.pageSize;
		} else {
			this.sortPageObj.pageIndex = pageEvent.pageIndex;
		}
		this.sortingPageChange.emit(this.sortPageObj);
	}
}
