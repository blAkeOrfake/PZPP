import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TransactionMapper } from 'src/app/mappers/transactionMapper';
import { Transaction } from 'src/app/models/transactions-model';
import { Person, IPerson } from 'src/app/models/user.model';
import { AccountsService } from 'src/app/services/accounts.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TransactionService } from 'src/app/services/transactions.service';
import { UserService } from 'src/app/services/users.service';

@Component({
	selector: 'app-account-details',
	templateUrl: './account-details.component.html',
	styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit {
	person: Person | null = null;
	userId: number = 1;
	get fullName(): string {
		return this.person ? this.person.getFullName() : '';
	}

	transactions: Transaction[] = [];

	constructor(
		private authService: AuthService,
		private router: Router,
		private accountsService: AccountsService,
		private translateService: TranslateService,
		private transactionService: TransactionService,
		private userService: UserService,
		private transactionMapper: TransactionMapper
	) {}

	ngOnInit(): void {
		this.userId = parseInt(localStorage.getItem('userId') || '0');
		this.person = new Person(this.authService.userValue as IPerson);
		this.getTransactions();
	}

	getTransactions() {
		this.transactionService.getUserTransactions(this.userId).subscribe((response) => {
			console.log('user transactions: ', response);

			this.transactions = response.map((transaction) => {
				const modifiedTransaction: Transaction = {
					id: transaction.id,
					type: transaction.type,
					category: this.transactionMapper.mapTransactionCategory(transaction.category?.toString() || ''),
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

	navigateToTransactions() {
		this.router.navigate(['/transactions']);
	}

	mapTransactionType(typeId: string): string {
		switch (typeId.toString()) {
			case "0":
				return 'INTERNAL';
			case "1":
				return 'EXTERNAL';
			default:
				return typeId;
		}
	}

	mapTransactionCategory(categoryId: string): string {
		switch (categoryId.toString()) {
			case "0":
				return 'Shopping';
			case "1":
				return 'Health Care';
			case "2":
				return 'Bills';
			case "3":
				return 'Food';
			case "4":
				return 'Entertainment';
			case "5":
				return 'Transfer';
			case "6":
				return 'Other';
			default:
				return 'Unknown category';
		}
	}
}
