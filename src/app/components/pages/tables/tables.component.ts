import { Component, OnInit } from '@angular/core';
import { IPagedResult, SortPageObj } from '@models/common.model';
import { IDemoTable } from '@models/demo-table.model';
import { Observable, of, timer } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { StaticTableData } from './static-data';

@Component({
	selector: 'app-tables',
	templateUrl: './tables.component.html',
	styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {
	demoTablePaged: IPagedResult<IDemoTable> = { items: StaticTableData, totalCount: StaticTableData.length };
	displayedColumns: string[] = ['first_name', 'last_name', 'email', 'gender', 'id'];
	pageLoaded$: Observable<boolean> = of(false);

	/**
	 * Quick and dirty observable timer / delay (better than a setTimeout...)
	 */
	ngOnInit(): void {
		this.pageLoaded$ = timer(1000, 500).pipe(
			take(1),
			map(() => true)
		);
	}

	/** Triggers when there is a sorting change in the template, resets page
	 * Note - disabled for the demo purposes.
	 */
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	onSortChange(ev: SortPageObj): void {
		return;
	}
}
