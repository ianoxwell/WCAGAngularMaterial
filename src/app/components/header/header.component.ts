import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ComponentBase } from '@components/base/base.component.base';
import { StateService } from '@services/state.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends ComponentBase implements OnInit {
	isDarkTheme = false;
	menuItems = [
		{ title: 'Basic Layouts', link: '/' },
		{ title: 'Forms', link: '/forms' },
		{ title: 'Tables', link: '/tables' }
	];

	constructor(@Inject(DOCUMENT) private document: Document, private stateService: StateService) {
		super();
	}

	ngOnInit(): void {
		this.isDarkTheme = this.stateService.updateTheme();
	}

	/**
	 * Scrolls the page to the main content section avoiding navigation elements.
	 */
	skip(): void {
		const pageTitleElement = this.document.getElementById('pageTitleMainContent');
		pageTitleElement?.scrollIntoView();
		pageTitleElement?.focus();
	}

	/**
	 * Toggle's the user's theme between light and dark theme.
	 */
	toggleTheme(): void {
		this.isDarkTheme = this.stateService.toggleTheme(!this.isDarkTheme);
	}
}
