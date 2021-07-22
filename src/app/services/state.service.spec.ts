import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Spy } from '@tests/auto-spy';
import { StateService } from './state.service';
import { UserService } from './user.service';

const userServiceSpy: Spy<UserService> = jasmine.createSpyObj('UserService', ['getAllUsers']);

describe('StateService', () => {
	let service: StateService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [{ provide: UserService, useValue: userServiceSpy }]
		});
		service = TestBed.inject(StateService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
