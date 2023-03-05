import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-tile',
  templateUrl: './account-tile.component.html',
  styleUrls: ['./account-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountTileComponent implements OnInit {

  @Input() accountName: string = '';
  @Input() accountBalance: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
