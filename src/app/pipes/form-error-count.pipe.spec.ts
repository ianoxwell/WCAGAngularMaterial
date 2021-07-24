import { FormErrorCountPipe } from './form-error-count.pipe';
import { FormGroup, FormControl, FormArray } from '@angular/forms';

describe('FormErrorCountPipe', () => {
	const errControl = () => new FormControl(null, () => ({ error: true }));

	let pipe: FormErrorCountPipe;

	beforeEach(() => {
		pipe = new FormErrorCountPipe();
	});

	describe('transform', () => {
		it('should return 0 for a blank group', () => {
			const control = new FormControl();

			const count = pipe.transform(control, true);

			expect(count).toEqual(0);
		});

		it('should return 0 for a group with no errors', () => {
			const control = new FormGroup({
				control: new FormControl()
			});

			const count = pipe.transform(control, true);

			expect(count).toEqual(0);
		});

		it('should return 1 for a control with an error', () => {
			const control = errControl();

			const count = pipe.transform(control, true);

			expect(count).toEqual(1);
		});

		it('should return 2 for a group with two errors', () => {
			const control = new FormGroup({
				err1: errControl(),
				err2: errControl(),
				fine: new FormControl(null)
			});

			const count = pipe.transform(control, true);

			expect(count).toEqual(2);
		});

		it('should return 0 for a non-submitted form with errors', () => {
			const control = errControl();

			const count = pipe.transform(control, false);

			expect(count).toEqual(0);
		});

		it('should return 1 for an error on a formgroup', () => {
			const control = new FormGroup({}, (group) => ({ error: true }));

			const count = pipe.transform(control, true);

			expect(count).toEqual(1);
		});

		it('should return 2 for an error on a formgroup and sub-control', () => {
			const control = new FormGroup(
				{
					err: errControl()
				},
				() => ({ error: true })
			);

			const count = pipe.transform(control, true);

			expect(count).toEqual(2);
		});

		it('should return 2 for a form array with two errors', () => {
			const control = new FormArray([errControl(), errControl(), new FormControl()]);

			const count = pipe.transform(control, true);

			expect(count).toEqual(2);
		});

		it('should count errors on touched controls only, if not submitted', () => {
			const err1 = errControl();
			const err2 = errControl();

			const control = new FormGroup({
				err1,
				err2
			});

			err1.markAsTouched();

			const count = pipe.transform(control, false);

			expect(count).toEqual(1); // only one control has been touched.
		});
	});

	describe('cross-field errors', () => {
		let err1: FormControl;
		let err2: FormControl;
		let err3: FormControl;
		let control: FormGroup;

		let error: any;

		beforeEach(() => {
			err1 = errControl();
			err2 = errControl();
			err3 = errControl();

			error = { associatedControl: 'err1', message: 'test-message' };
			control = new FormGroup({ err1, err2, err3 }, () => ({ error }));
		});

		it('should count errors only where at least on control has been touched', () => {
			err1.markAsTouched();

			const count = pipe.transform(control, false);

			expect(count).toEqual(2); // 1 for err1 and 1 for the group.
		});

		it('should count errors only where at least on control has been touched, for multiple controls', () => {
			error.associatedControl = ['err1', 'err2'];
			err1.markAsTouched();

			const count = pipe.transform(control, false);

			expect(count).toEqual(2); // 1 for err1 and 1 for the group.
		});

		it('should count errors only when a control has been touched', () => {
			const count = pipe.transform(control, false);

			expect(count).toEqual(0);
		});
	});
});
