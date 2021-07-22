import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PaginatorComponent } from './paginator.component';

describe('PaginatorComponent', () => {
	let component: PaginatorComponent;
	let fixture: ComponentFixture<PaginatorComponent>;

	const formBuilder: FormBuilder = new FormBuilder();

	beforeEach(
		waitForAsync(() => {
			TestBed.configureTestingModule({
				imports: [MatIconModule, MatSelectModule, ReactiveFormsModule, NoopAnimationsModule, MatButtonModule],
				declarations: [PaginatorComponent],
				providers: [{ provide: FormBuilder, useValue: formBuilder }]
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(PaginatorComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
