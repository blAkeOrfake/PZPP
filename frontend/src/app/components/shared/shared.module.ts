import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountTileComponent } from './account-tile/account-tile.component';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
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
