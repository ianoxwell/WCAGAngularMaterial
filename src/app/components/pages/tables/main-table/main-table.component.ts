import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BaseTableComponent } from '@components/base/table.component.base';
import { IDemoTable } from '@models/demo-table.model';
import { MessageStatus } from '@models/message.model';
import { MessageService } from '@services/message.service';

@Component({
	selector: 'app-main-table',
	templateUrl: './main-table.component.html',
	styleUrls: ['./main-table.component.scss']
})
export class MainTableComponent extends BaseTableComponent<IDemoTable> implements OnInit, AfterViewInit {
	constructor(private messageService: MessageService) {
		super();
	}

	ngOnInit(): void {
		this.dataSource = new MatTableDataSource(this.data?.items);
		this.dataLength = this.data?.totalCount;
	}

	ngAfterViewInit(): void {
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
	}

	/** Sets boolean for mouseRow for the row, for css class rollover effect */
	mouseRow(row: IDemoTable, inOut: string): void {
		if (inOut === 'over') {
			row.mouseRow = true;
		} else {
			row.mouseRow = undefined;
		}
	}

	/** on row / ingredient clicked emit to parent the row */
	goto(row: IDemoTable): void {
		this.messageService.add({
			severity: MessageStatus.Information,
			summary: `Selected row with id: ${row.id}`,
			detail: `name: ${row.first_name} ${row.last_name}`,
			life: 12000
		});
	}
}
