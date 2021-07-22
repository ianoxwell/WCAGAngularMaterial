import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
	providedIn: 'root'
})
export class StateService {
	currentTheme$ = new BehaviorSubject<string>('light-theme');

	constructor(private storageService: StorageService) {}

	/**
	 * Gets the current value of the string set for the current table view.
	 * @returns observable of the current table view.
	 */
	getCurrentTheme(): Observable<string> {
		return this.currentTheme$.asObservable();
	}

	/**
	 * Checks the user's current theme settings and updates the app accordingly.
	 * If no theme is found, it defaults to users preferred theme.
	 * @returns Whether the user is currently using the dark theme.
	 */
	updateTheme(): boolean {
		let theme = this.storageService.getItem('theme');

		if (theme === null) {
			theme =
				window.matchMedia &&
				window.matchMedia('(prefers-color-scheme: dark)').matches
					? 'dark-theme'
					: 'light-theme';
			this.storageService.setItem('theme', theme);
		}

		this.currentTheme$.next(theme);

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
			this.currentTheme$.next('dark-theme');
		} else {
			this.storageService.setItem('theme', 'light-theme');
			this.currentTheme$.next('light-theme');
		}

		return isDarkTheme;
	}
}
