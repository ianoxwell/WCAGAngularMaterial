import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSort } from '@angular/material/sort';
import { fakeEmptyFilterParams } from '@tests/test-helpers.models';
import { BaseTableComponent } from './table.component.base';

describe('TableComponentBase', () => {
	let component: BaseTableComponent;
	let fixture: ComponentFixture<BaseTableComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [BaseTableComponent]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(BaseTableComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('Pagination change event', () => {
		beforeEach(() => {
			component.sortPageObj = { ...fakeEmptyFilterParams };
		});
		it('should reset the pageIndex if the pageSize has changed', () => {
			component.sortPageObj.pageIndex = 2;
			component.onPageChange({ pageSize: 15, pageIndex: 2, previousPageIndex: 2, length: 25 });
			expect(component.sortPageObj.pageIndex).toEqual(0);
			expect(component.sortPageObj.pageSize).toEqual(15);
		});
		it('should change the pageIndex on increment of page', () => {
			component.onPageChange({ pageSize: 25, pageIndex: 1, previousPageIndex: 0, length: 25 });
			expect(component.sortPageObj.pageIndex).toEqual(1);
		});
	});

	it('should modify the filterParams and search on a sorting change', () => {
		component.sortPageObj = fakeEmptyFilterParams;
		component.sortPageObj.pageIndex = 2;
		component.onSortChange({ active: 'name', direction: 'desc' } as MatSort);
		expect(component.sortPageObj).toEqual(fakeEmptyFilterParams);
	});
});
