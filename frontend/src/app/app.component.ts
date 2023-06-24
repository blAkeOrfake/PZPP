import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';

  constructor(
    private translateService: TranslateService,
  ) {}
  get isLogged() {
    try {
      return !!JSON.parse(localStorage.getItem('user') as string);
    } catch (error) {
      return false;
    }
  }
  ngOnInit(): void {
    this.translateService.setDefaultLang('en');
    this.translateService.use('en');
  }
}
