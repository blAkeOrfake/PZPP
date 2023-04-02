import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-sidepanel-left',
  templateUrl: './sidepanel-left.component.html',
  styleUrls: ['./sidepanel-left.component.scss']
})
export class SidepanelLeftComponent implements OnInit {
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  logOut(): void {
    this.authService.logout();
  }

}
