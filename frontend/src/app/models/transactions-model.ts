export interface ITransaction {
    id?: number;
    type: TransactionType;
    category?: TransactionCategory;
    fromId: number;
    toId: number;
    amount: number;
    date?: Date;
  }
  
  export class Transaction implements ITransaction {
    constructor(initialValues: ITransaction) {
      Object.assign(this, initialValues);
    }
  
    id?: number;
    type!: TransactionType;
    category?: TransactionCategory;
    fromId!: number;
    toId!: number;
    amount!: number;
    date?: Date;
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
  