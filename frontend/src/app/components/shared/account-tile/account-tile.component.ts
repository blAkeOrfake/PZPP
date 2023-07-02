import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TransactionDialogComponent } from '../../transaction-dialog/transaction-dialog-component';
import { TransactionService } from 'src/app/services/transactions.service';
import { Transaction } from 'src/app/models/transactions-model';

@Component({
	selector: 'app-account-tile',
	templateUrl: './account-tile.component.html',
	styleUrls: ['./account-tile.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountTileComponent implements OnInit {
	@Input() accountName: string = '';
	@Input() accountBalance: number = 0;
	@Input() viewMode: 'view' | 'create' = 'view';
	userId: string = ''

	transferForm: FormGroup = this.formBuilder.group({
		recipient: '',
		amount: 0,
		category: 0
	});

	@Output() onAddAccount: EventEmitter<any> = new EventEmitter();
	@Output() onRemoveAccount: EventEmitter<any> = new EventEmitter();

	constructor(
		private dialog: MatDialog,
		private formBuilder: FormBuilder,
		private transactionService: TransactionService
	) {
		this.userId = localStorage.getItem('userId') || '';
	}

	ngOnInit(): void { }

	openTransferMoneyDialog() {
		const dialogRef = this.dialog.open(TransactionDialogComponent, {
			width: '300px',
			data: { transferForm: this.transferForm }
		});

		dialogRef.afterClosed().subscribe(result => {
			console.log('dialogresult, result');
			if (result) {
				const transferFormValue = result.transferFormValue;
				const selectedUserId = result.selectedUserId;
				
				const transaction: Transaction = {
					fromId: this.userId,
					toId: selectedUserId,
					amount: transferFormValue.amount,
					category: transferFormValue.category,
					type: '0'
				}
				
				console.log(transaction);
				
				const data =this.prepareDataToSend(transaction);
				this.transactionService.sendTransaction(data).subscribe((res) => {
					console.log(res);
				})
			}
		});
	}

	prepareDataToSend(transaction: any): any {
		const data = Object.assign({}, transaction);
		data.fromId = +transaction.fromId;
		data.category = +transaction.category;
		data.type = 1;

		return data;
	}
}

