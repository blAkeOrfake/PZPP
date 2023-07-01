export interface ITransaction {
    id?: string;
    type: string;
    category?: string;
    fromId: string;
    toId: string;
    amount: string;
    date?: string;
  }
  
  export class Transaction implements ITransaction {
    id?: string;
    type: string;
    category?: string;
    fromId: string;
    toId: string;
    amount: string;
    date?: string;

    constructor(initialValues: ITransaction) {
      Object.assign(this, initialValues);
        this.id = initialValues.id || '0';
        this.type = initialValues.type;
        this.category =initialValues.category || '';
        this.fromId = initialValues.fromId;
        this.toId = initialValues.toId;
        this.amount = initialValues.amount;
        this.date = initialValues.date
  }
}
  
  export enum TransactionType {
    INTERNAL,
    EXTERNAL
  }
  
  export enum TransactionCategory {
    SHOPPING,
    HEALTH_CARE,
    BILLS,
    FOOD,
    ENTERTAINMENT,
    TRANSFER,
    OTHER
  }
