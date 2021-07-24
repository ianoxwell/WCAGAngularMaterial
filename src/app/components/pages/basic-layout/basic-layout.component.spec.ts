import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicLayoutComponent } from './basic-layout.component';

describe('BasicLayoutComponent', () => {
	let component: BasicLayoutComponent;
	let fixture: ComponentFixture<BasicLayoutComponent>;

	beforeEach(
		waitForAsync(() => {
			TestBed.configureTestingModule({
				declarations: [BasicLayoutComponent]
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(EditCommonMineralsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
