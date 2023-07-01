import { Component, OnInit } from '@angular/core';
import { AccountsService } from 'src/app/services/accounts.service';
import { User } from 'src/app/models/user.model';
import { Transaction } from 'src/app/models/transactions-model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TransactionService } from 'src/app/services/transactions.service';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'transactions-component',
  templateUrl: './transactions-component.html',
  styleUrls: ['./transactions-component.scss']
})
export class TransactionsComponent implements OnInit {
    public userId: number = 1;
  user: User | null;
  title: string = '';
  transactions: Transaction[] = [];

  constructor(
    private authService: AuthService,
    private transactionService: TransactionService,
    private translateService: TranslateService,
    private userService: UserService
  ) {
    this.user = this.authService.userValue;
  }

  ngOnInit(): void {
    this.userId = parseInt(localStorage.getItem('userId') || '0');

    this.transactionService.getUserTransactions(this.userId).subscribe((response) => {
        console.log('user transactions: ', response);
  
        this.transactions = response.map((transaction) => {
          const modifiedTransaction: Transaction = {
            id: transaction.id,
            type: transaction.type,
            category: transaction.category,
            fromId: transaction.fromId,
            toId: transaction.toId,
            amount: transaction.amount,
            date: transaction.date
          };
  
          this.userService.getUserById(parseInt(transaction.fromId)).subscribe((fromUser) => {
            modifiedTransaction.fromId = fromUser?.username || 'User not found';
          });
  
          this.userService.getUserById(parseInt(transaction.toId)).subscribe((fromUser) => {
            modifiedTransaction.toId = fromUser?.username || 'User not found';
          });
  
          return modifiedTransaction;
        });
      });
  }
}
