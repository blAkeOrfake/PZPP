import { Component, OnInit } from '@angular/core';
import { Person, IPerson } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
	selector: 'app-account-details',
	templateUrl: './account-details.component.html',
	styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit {
	person: Person | null = null;

	get fullName(): string {
		return this.person ? this.person.getFullName() : '';
	}

	constructor(
		private authService: AuthService
	) {}

	ngOnInit(): void {
		this.person = new Person(this.authService.userValue as IPerson);
	}

}
