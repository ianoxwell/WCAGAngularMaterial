import { Component } from '@angular/core';
import { PageTitleService } from '@services/page-title.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-page-title',
	templateUrl: './page-title.component.html',
	styleUrls: ['./page-title.component.scss']
})
export class PageTitleComponent {
	pageTitle$: Observable<string>;
	pageUrl$: Observable<string>;

	constructor(private pageTitleService: PageTitleService) {
		// async variable in the template
		this.pageTitle$ = this.pageTitleService.pageTitle$;
		this.pageUrl$ = this.pageTitleService.pageUrl$;
	}
}
