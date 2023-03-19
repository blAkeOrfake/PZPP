import { Component, OnInit } from '@angular/core';
import { AccountsService } from 'src/app/services/accounts.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public userId: number = 1;
  constructor(
    private accountsService: AccountsService
  ) { }

  ngOnInit(): void {
    // TODO: Get User and set userId
    this.accountsService.getAccounts().subscribe((response) => {
      console.log('accounts from be', response);
    });
  }

}
