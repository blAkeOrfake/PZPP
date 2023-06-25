import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-switch',
  templateUrl: './language-switch.component.html',
  styleUrls: ['./language-switch.component.scss']
})
export class LanguageSwitchComponent {
  langForm = new FormGroup({
    selectedLanguage: new FormControl()
  });

  constructor(
    private translateService: TranslateService
  ) { }

  get currentLanguage() {
    return localStorage.getItem('language');
  }

  ngOnInit(): void {
    this.langForm.controls.selectedLanguage.setValue(
      localStorage.getItem('language') ?
        localStorage.getItem('language') as string :
        'en'
    );
  }

  setLanguage(language: string) {
    localStorage.setItem('language', language);
    this.translateService.use(language);
  }

}
