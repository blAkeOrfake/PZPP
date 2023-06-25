import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountTileComponent } from './account-tile/account-tile.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AccountsWidgetComponent } from './accounts-widget/accounts-widget.component';
import { AddAccountDialogComponent } from './dialogs/add-account-dialog/add-account-dialog.component';
import { AddPernamentTransferDialogComponent } from './dialogs/add-pernament-transfer-dialog/add-pernament-transfer-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AccountTileComponent,
    AccountsWidgetComponent,
    AddAccountDialogComponent,
    AddPernamentTransferDialogComponent
  ],
  imports: [
    TranslateModule,
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
    AddAccountDialogComponent,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ]
})
export class SharedModule { }
