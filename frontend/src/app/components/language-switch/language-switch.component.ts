import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-switch',
  templateUrl: './language-switch.component.html',
  styleUrls: ['./language-switch.component.scss']
})
export class LanguageSwitchComponent {

  constructor(
    private translateService: TranslateService
  ) { }

  get currentLanguage() {
    return localStorage.getItem('language');
  }

  setLanguage(language: string) {
    localStorage.setItem('language', language);
    this.translateService.use(language);
    window.location.reload();
  }

}
