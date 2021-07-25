import { Component, OnInit } from '@angular/core';
import { demoTable } from '@models/demo-table.model';
import { StaticTableData } from './static-data';

@Component({
	selector: 'app-tables',
	templateUrl: './tables.component.html',
	styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {
	demoTable: demoTable[] = StaticTableData;

	ngOnInit(): void {
		console.log('table started here');
	}
}
