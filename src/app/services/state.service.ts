import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
	providedIn: 'root'
})
export class StateService {


	constructor(private storageService: StorageService) {}

	/**
	 * Checks the user's current theme settings and updates the app accordingly.
	 * If no theme is found, it defaults to light theme.
	 * @returns Whether the user is currently using the dark theme.
	 */
	updateTheme(): boolean {
		let theme = this.storageService.getItem('theme');

		if (theme === null) {
			theme = 'light-theme';
			this.storageService.setItem('theme', theme);
		}

		document.querySelector('body')?.classList.add(theme);

		return theme === 'dark-theme';
	}

	/**
	 * Toggle's the user's theme between light and dark theme, and saves their preference
	 * to the local storage.
	 * @param isDarkTheme Whether the user is changing the theme to dark-theme.
	 * @returns Whether the user is currently using the dark theme.
	 */
	toggleTheme(isDarkTheme: boolean): boolean {
		if (isDarkTheme) {
			this.storageService.setItem('theme', 'dark-theme');
			document.querySelector('body')?.classList.replace('light-theme', 'dark-theme');
		} else {
			this.storageService.setItem('theme', 'light-theme');
			document.querySelector('body')?.classList.replace('dark-theme', 'light-theme');
		}

		return isDarkTheme;
	}

}
