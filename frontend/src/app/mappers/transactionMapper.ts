import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Transaction, ITransaction } from '../models/transactions-model';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { first } from 'rxjs';


export enum TransactionCategoryEnum {
    Shopping,
    HealthCare,
    Bills,
    Food,
    Entertainment,
    Transfer,
    Other
}
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
        const id = parseInt(categoryId);
        switch (id) {
            case TransactionCategoryEnum.Shopping:
                return this.getString('transactionCategories.shopping');
            case TransactionCategoryEnum.HealthCare:
                return this.getString('transactionCategories.healthCare');
            case TransactionCategoryEnum.Bills:
                return this.getString('transactionCategories.bills');
            case TransactionCategoryEnum.Food:
                return this.getString('transactionCategories.food');
            case TransactionCategoryEnum.Entertainment:
                return this.getString('transactionCategories.entertainment');
            case TransactionCategoryEnum.Transfer:
                return this.getString('transactionCategories.transfer');
            case TransactionCategoryEnum.Other:
                return this.getString('transactionCategories.other');
            default:
                return 'Unknown category';
        }
    }

    getString(key: string): string {
        return this.translateService.instant(key);
    }
}
