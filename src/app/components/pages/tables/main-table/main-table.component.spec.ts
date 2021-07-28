import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { IDemoTable } from '@models/demo-table.model';
import { MessageService } from '@services/message.service';
import { autoSpy, Spy } from '@tests/auto-spy';
import { StaticTableData } from '../static-data';
import { MainTableComponent } from './main-table.component';

describe('MainTableComponent', () => {
	let component: MainTableComponent;
	let fixture: ComponentFixture<MainTableComponent>;
	const data: IDemoTable[] = StaticTableData;

	const messageServiceSpy: Spy<MessageService> = autoSpy(MessageService);
	messageServiceSpy.add.and.returnValue();

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [MatTableModule, MatPaginatorModule, MatSortModule],
			declarations: [MainTableComponent],
			providers: [{ provide: MessageService, useValue: messageServiceSpy }]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(MainTableComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should add and remove mouseRow from data', () => {
		expect(data[2].mouseRow).toBeFalsy();

		component.mouseRow(data[2], 'over');
		expect(data[2].mouseRow).toBeTrue();

		component.mouseRow(data[2], 'out');
		expect(data[2].mouseRow).toBeFalsy();
	});

	it('should display message on action click', () => {
		component.goto(data[3]);
		// eslint-disable-next-line @typescript-eslint/unbound-method
		expect(messageServiceSpy.add).toHaveBeenCalled();
	});
});
