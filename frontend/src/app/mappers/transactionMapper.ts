import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Transaction, ITransaction } from '../models/transactions-model';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { first } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TransactionMapper {
    constructor(private translateService: TranslateService) { }

    mapTransactionType(typeId: string): string {
        switch (typeId.toString()) {
            case "0":
                return 'INTERNAL';
            case "1":
                return 'EXTERNAL';
            default:
                return typeId;
        }
    }

   mapTransactionCategory(categoryId: string): string {
        switch (categoryId.toString()) {
            case "0":
                return this.getString('transactionCategory.shopping');
            case "1":
                return this.getString('transactionCategory.healthCare');
            case "2":
                return this.getString('transactionCategories.bills');
            case "3":
                return this.getString('transactionCategories.food');
            case "4":
                return this.getString('transactionCategories.entertainment');
            case "5":
                return this.getString('transactionCategories.transfer');
            case "6":
                return this.getString('transactionCategories.other');
            default:
                return 'Unknown category';
        }
    }

    getString(key: string): string {
        return this.translateService.instant(key);
    }
}
