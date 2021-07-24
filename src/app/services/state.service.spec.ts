import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { StateService } from './state.service';

describe('StateService', () => {
	let service: StateService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: []
		});
		service = TestBed.inject(StateService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
