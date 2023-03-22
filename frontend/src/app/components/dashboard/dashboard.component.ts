import { Component, OnInit } from '@angular/core';
import { AccountsService } from 'src/app/services/accounts.service';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public userId: number = 1;
  user: User | null;

  constructor(
    private authService: AuthService,
    private accountsService: AccountsService

  ) { 
    this.user = this.authService.userValue;
  }

  ngOnInit(): void {
    // TODO: Get User and set userId
    this.accountsService.getAccounts().subscribe((response) => {
      console.log('accounts from be', response);
    });
  }

}
