import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/users.service';
import { IUser } from 'src/app/models/user.model';

@Component({
  selector: 'transaction-dialog',
  templateUrl: './transaction-dialog-component.html',
  styleUrls: ['./transaction-dialog-component.scss']
})
export class TransactionDialogComponent {
  transferForm: FormGroup;
  users: IUser[] = [];
  selectedUserId: number = 0;
  userId = '-1';

  constructor(
    public dialogRef: MatDialogRef<TransactionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService
  ) {
    this.transferForm = data.transferForm;
    this.userId = localStorage.getItem('userId') || '-1';
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users.filter(user => user.id !== this.userId);
    });
  }

  onNoClick(): void {
    this.dialogRef.close({ transferFormValue: this.transferForm.value, selectedUserId: this.selectedUserId });
  }
}
