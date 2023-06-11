import { Component, OnInit } from '@angular/core';
import { AddPernamentTransferDialogComponent, IAddPernamentTransferDialogResult } from '../shared/dialogs/add-pernament-transfer-dialog/add-pernament-transfer-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  addPernamentPaymentModal(): void {
    const data = {
      width: '600px'
    }
    this.dialog.open(AddPernamentTransferDialogComponent,
      data
    )
      .afterClosed()
      .subscribe((result: IAddPernamentTransferDialogResult) => {
        if (result) {
          console.log(result);
        }
      });
  }
}
