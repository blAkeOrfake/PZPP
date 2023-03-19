import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountTileComponent } from './account-tile/account-tile.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AccountsWidgetComponent } from './accounts-widget/accounts-widget.component';
import { AddAccountDialogComponent } from './dialogs/add-account-dialog/add-account-dialog.component';

@NgModule({
  declarations: [
    AccountTileComponent,
    AccountsWidgetComponent,
    AddAccountDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule,
    MatIconModule
  ],
  exports: [
    AccountTileComponent,
    AccountsWidgetComponent,
    AddAccountDialogComponent
  ]
})
export class SharedModule { }
