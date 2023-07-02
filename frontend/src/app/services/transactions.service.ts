import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Transaction, ITransaction } from '../models/transactions-model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private transactionsUrl = environment.apiUrl + '/transaction';

  constructor(private httpClient: HttpClient) { }

  getUserTransactions(userId: number): Observable<ITransaction[]> {
    return this.httpClient.get(`${this.transactionsUrl}/${userId}`).pipe(map((response: any) => {
      return response.map((x: any) => new Transaction(x))
    }));
  }

  sendTransaction(transaction: Transaction): Observable<ITransaction> {
    return this.httpClient.post(`${this.transactionsUrl}/send`, transaction).pipe(map((response: any) => new Transaction(response)));
  }
}
