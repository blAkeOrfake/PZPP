import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountTileComponent } from './account-tile/account-tile.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AccountTileComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule
  ],
  exports: [
    AccountTileComponent
  ]
})
export class SharedModule { }
