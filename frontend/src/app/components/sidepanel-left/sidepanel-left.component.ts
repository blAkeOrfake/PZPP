import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidepanel-left',
  templateUrl: './sidepanel-left.component.html',
  styleUrls: ['./sidepanel-left.component.scss']
})
export class SidepanelLeftComponent implements OnInit {
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logOut() {
    sessionStorage.setItem('isLoggedIn', 'false');
    window.location.reload();
    this.router.navigate(['login']);
  }

}
