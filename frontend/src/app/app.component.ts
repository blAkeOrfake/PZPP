import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLogged: boolean = false;
  title = 'frontend';

  ngOnInit(): void {
    if(sessionStorage.getItem('isLoggedIn') === 'true') {
      this.isLogged = true;
    }
  }
}
