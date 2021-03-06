import { AbstractControl } from '@angular/forms';

export class ConfirmPasswordValidator {
	/**
	 * Check matching password with confirm password
	 * @param control AbstractControl
	 */
	static MatchPassword(control: AbstractControl) {
		const password: string = control.get('password').value;
		const confirmPassword: string = control.get('confirmPassword').value;

		// if (control.get('password')) password = control.get('password').value
		// else if (control.get('newPassword')) password = control.get('newPassword').value;

		if (password !== confirmPassword) {
			control.get('confirmPassword').setErrors({ ConfirmPassword: true });
		} else {
			control.get('confirmPassword').setErrors(null)
			return null;
		}
	}
}
