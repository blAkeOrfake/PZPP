import { Component, OnInit } from '@angular/core';
import { AccountsService } from 'src/app/services/accounts.service';
import { User } from 'src/app/models/user.model';
import { Transaction } from 'src/app/models/transactions-model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TransactionService } from 'src/app/services/transactions.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public userId: number = 1;
  user: User | null;
  title: string = '';
  transactions: Transaction[] = [];

  constructor(
    private authService: AuthService,
    private accountsService: AccountsService,
    private translateService: TranslateService,
    private transactionService: TransactionService
  ) { 
    this.user = this.authService.userValue;
  }

  ngOnInit(): void {
    // TODO: Get User and set userId
    this.accountsService.getAccounts().subscribe((response) => {
      console.log('accounts from be', response);
    });

    this.translateService.get('dashboard.label', {name: this.user?.username}).subscribe((translation: string) => {
      this.title = translation;
    });

    this.transactionService.getUserTransactions(this.userId).subscribe((response) => {
      this.transactions = response;
      console.log('user transactions: ', response);
    });
  }
}
