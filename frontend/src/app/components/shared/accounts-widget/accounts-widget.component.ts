import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { Account } from 'src/app/models/accounts-model';
import { AccountsService } from 'src/app/services/accounts.service';
import { AddAccountDialogComponent } from '../dialogs/add-account-dialog/add-account-dialog.component';

@Component({
	selector: 'app-accounts-widget',
	templateUrl: './accounts-widget.component.html',
	styleUrls: ['./accounts-widget.component.scss']
})
export class AccountsWidgetComponent implements OnInit {
	@Input() userId!: number;
	accounts: Account[] = [];

	constructor(
		private cdRef: ChangeDetectorRef,
		public dialog: MatDialog,
		private accountsService: AccountsService
	) { }

	ngOnInit() {
		this.getAccounts();
	}

	getAccounts() {
		this.accountsService.getUserAccounts(this.userId).subscribe((response) => {
			this.accounts = response;
			this.cdRef.detectChanges();
		});
	}

	openAddAccountDialog(): void {
		const dialogRef = this.dialog.open(AddAccountDialogComponent, {
			data: {userId: this.userId},
		});
	
		dialogRef.afterClosed().subscribe((result: Account | undefined) => {
			if (result) {
				this.getAccounts();
			}
		});
	}

	removeAccount(accountId: number | undefined) {
		if (!accountId) return;

		this.accountsService.removeAccount(accountId).subscribe(() => {
			this.getAccounts();
		});
	}
}
