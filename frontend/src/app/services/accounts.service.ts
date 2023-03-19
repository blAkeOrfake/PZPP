import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Account, IAccount } from '../models/accounts-model';
import { HttpClient } from '@angular/common/http';


@Injectable({
	providedIn: 'root'
})
export class AccountsService {
	accountsUrl = environment.apiUrl + '/accounts';

	constructor(
		private httpClient: HttpClient
	) { }

	getAccounts(): Observable<IAccount[]> {
		return this.httpClient.get(`${this.accountsUrl}`).pipe(map((response: any) => {
			return response.map((x: any) => new Account(x))
		}));
	}

	getUserAccounts(userId: number): Observable<IAccount[]> {
		return this.httpClient.get(`${this.accountsUrl}/user/${userId}`).pipe(map((response: any) => {
			return response.map((x: any) => new Account(x))
		}));
	}

	addAccount(account: Account): Observable<any> {
		return this.httpClient.post(`${this.accountsUrl}`, account);
	}

	removeAccount(accountId: number): Observable<any> {
		return this.httpClient.delete(`${this.accountsUrl}/${accountId}`);
	}
}
