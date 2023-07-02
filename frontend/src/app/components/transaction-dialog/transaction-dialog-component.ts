import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/users.service';
import { IUser } from 'src/app/models/user.model';
import { TransactionCategoryEnum, TransactionMapper } from 'src/app/mappers/transactionMapper';

@Component({
  selector: 'transaction-dialog',
  templateUrl: './transaction-dialog-component.html',
  styleUrls: ['./transaction-dialog-component.scss']
})
export class TransactionDialogComponent {
  readonly categoriesOptions = Object.keys(TransactionCategoryEnum).filter(x => !isNaN(Number(x)));
  transferForm: FormGroup = new FormGroup(
    {
      recipient: new FormControl(''),
      amount: new FormControl(0),
      category: new FormControl({}),
    }

  );
  users: IUser[] = [];
  selectedUserId: number = 0;
  userId = '-1';

  constructor(
    public dialogRef: MatDialogRef<TransactionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private transactionMapper: TransactionMapper
  ) {
    this.transferForm = data.transferForm;
    this.userId = localStorage.getItem('userId') || '-1';
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users.filter(user => user.id != this.userId);
    });
  }

  onSubmitClick(): void {
    console.log('transferformvalue: ', this.transferForm.value);
    this.dialogRef.close({ transferFormValue: this.transferForm.value, selectedUserId: this.selectedUserId });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getCategoryName(categoryId: string): string {
    return this.transactionMapper.mapTransactionCategory(categoryId);
  }
}
