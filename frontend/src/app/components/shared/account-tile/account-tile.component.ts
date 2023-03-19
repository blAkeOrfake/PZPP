import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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

	@Output() onAddAccount: EventEmitter<any> = new EventEmitter();
	@Output() onRemoveAccount: EventEmitter<any> = new EventEmitter();

	constructor() { }

	ngOnInit(): void {
	}

}
