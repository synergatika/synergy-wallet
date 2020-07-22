import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TranslationService } from '../../../../core/helpers/translation.service';

/**
 * Services
 */
import { StaticDataService } from '../../../../core/helpers/static-data.service';

/**
 * Models & Interfaces
 */
import { Language } from '../../../../core/interfaces/language.interface';

@Component({
	selector: 'app-language-switcher',
	templateUrl: './language-switcher.component.html',
	styleUrls: ['./language-switcher.component.scss']
})
export class LanguageSwitcherComponent implements OnInit {

	public languages: Language[];
	public language: Language;
	iconType: any;

	constructor(
		private router: Router,
		private translationService: TranslationService,
		private staticDataService: StaticDataService
	) {
		this.languages = this.staticDataService.getLanguages;
	}

	ngOnInit() {
		console.log("Hello 1");

		this.setSelectedLanguage();
		this.router.events
			.pipe(filter(event => event instanceof NavigationStart))
			.subscribe(event => {
				this.setSelectedLanguage();
				console.log("1", this.setSelectedLanguage());
			});
	}

	/**
	 * Set language
	 *
	 * @param lang: string
	 */
	setLanguage(lang: string) {
		this.languages.forEach((language: Language) => {
			if (language.lang === lang) {
				language.active = true;
				this.language = language;
			} else {
				language.active = false;
			}
		});
		this.translationService.setLanguage(lang);
	}

	/**
	 * Set selected language
	 */
	setSelectedLanguage(): any {
		this.setLanguage(this.translationService.getSelectedLanguage());
	}

}
