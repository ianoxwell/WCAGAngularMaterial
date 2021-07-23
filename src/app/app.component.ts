import { OverlayContainer } from '@angular/cdk/overlay';
import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { ComponentBase } from '@components/base/base.component.base';
import { PageTitleService } from '@services/page-title.service';
import { StateService } from '@services/state.service';
import { takeUntil, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent extends ComponentBase implements OnInit {
	themes: string[] = ['light-theme', 'dark-theme'];
	siteName: string = environment.appTitle;

	constructor(
		@Inject(DOCUMENT) private document: Document,
		private pageTitleService: PageTitleService,
		private stateService: StateService,
		private overlayContainer: OverlayContainer,
		private renderer: Renderer2
	) {
		super();
	}

	ngOnInit(): void {
		// fix for WCAG overlay bug - https://github.com/angular/components/issues/20001
		this.overlayContainer.getContainerElement().setAttribute('role', 'region');
		this.pageTitleService
			.listenPageTitle()
			.pipe(takeUntil(this.ngUnsubscribe))
			.subscribe();
		this.stateService
			.getCurrentTheme()
			.pipe(
				tap((theme: string) => {
					this.themes.forEach((item: string) =>
						this.renderer.removeClass(this.document.body, item)
					);
					this.renderer.addClass(this.document.body, theme);
					this.applyThemeOnOverlays(theme);
				}),
				takeUntil(this.ngUnsubscribe)
			)
			.subscribe();
	}

	/**
	 * Apply the current theme on components with overlay (e.g. Dropdowns, Dialogs)
	 */
	private applyThemeOnOverlays(theme: string) {
		// remove old theme class and add new theme class
		// we're removing any css class that contains '-theme' string but your theme classes can follow any pattern
		const overlayContainerClasses =
			this.overlayContainer.getContainerElement().classList;
		const themeClassesToRemove = Array.from(this.themes);
		if (themeClassesToRemove.length) {
			overlayContainerClasses.remove(...themeClassesToRemove);
		}
		overlayContainerClasses.add(theme);
	}
}
