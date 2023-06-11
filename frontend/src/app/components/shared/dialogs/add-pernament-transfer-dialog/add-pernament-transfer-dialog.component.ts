import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

export interface IAddPernamentTransferDialogResult {
  success: boolean;
  id: number | null;
}

@Component({
  selector: 'app-add-pernament-transfer-dialog',
  templateUrl: './add-pernament-transfer-dialog.component.html',
  styleUrls: ['./add-pernament-transfer-dialog.component.scss']
})
export class AddPernamentTransferDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AddPernamentTransferDialogComponent>
  ) { }

  onCancelClick(): void {
		this.dialogRef.close(false);
	}

  onAddClick(): void {
    this.dialogRef.close(true);
  }
}
