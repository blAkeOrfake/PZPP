import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Account, AccountType } from 'src/app/models/accounts-model';
import { AccountsService } from 'src/app/services/accounts.service';

export interface AddAccountDialogData {
	userId: number;
}
@Component({
	selector: 'app-add-account-dialog',
	templateUrl: './add-account-dialog.component.html',
	styleUrls: ['./add-account-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddAccountDialogComponent {
	readonly accountTypes = [
		{value: AccountType.General, viewValue: 'General'},
		{value: AccountType.Savings, viewValue: 'Savings'},
		{value: AccountType.Currency, viewValue: 'Currency'},
	];

	public accountName: string = '';
	public accountType: AccountType = AccountType.General;

	constructor(
		public dialogRef: MatDialogRef<AddAccountDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: AddAccountDialogData,
		private accountsService: AccountsService
	) {}

	onCancelClick(): void {
		this.dialogRef.close(false);
	}

	onAddClick(): void {
		const account = new Account({
			userId: this.data.userId,
			name: this.accountName,
			type: this.accountType,
			balance: 0
		});
		
		this.accountsService.addAccount(account).subscribe(() => {
			this.dialogRef.close({account});
		});
	}
}
