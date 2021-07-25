import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { PageTitleService } from './page-title.service';

describe('StateService', () => {
	let service: PageTitleService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: []
		});
		service = TestBed.inject(PageTitleService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
