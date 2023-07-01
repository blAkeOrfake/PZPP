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
        this.type = mapTransactionType(initialValues.type)
        this.category = mapTransactionCategory(initialValues.category || '0');
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

  function mapTransactionType(typeId: string): string {
    switch (typeId.toString()) {
      case "0":
        return 'INTERNAL';
      case "1":
        return 'EXTERNAL';
      default:
        return typeId;
    }
  }

  function mapTransactionCategory(categoryId: string): string {
    console.log(typeof(categoryId));
    switch (categoryId.toString()) {
      case "0":
        return 'Shopping';
      case "1":
        return 'Health Care';
      case "2":
        return 'Bills';
      case "3":
        return 'Food';
      case "4":
        return 'Entertainment';
      case "5":
        return 'Transfer';
      case "6":
        return 'Other';
      default:
        return 'Unknown category';
    }
  }
