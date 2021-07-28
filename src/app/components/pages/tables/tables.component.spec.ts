import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { LoadingIndicatorComponent } from '@components/loading-indicator/loading-indicator.component';
import { MockComponent } from 'ng-mocks';
import { MainTableComponent } from './main-table/main-table.component';
import { TablesComponent } from './tables.component';

describe('TablesComponent', () => {
	let component: TablesComponent;
	let fixture: ComponentFixture<TablesComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [MatCardModule],
			declarations: [TablesComponent, MockComponent(MainTableComponent), MockComponent(LoadingIndicatorComponent)]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(TablesComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
