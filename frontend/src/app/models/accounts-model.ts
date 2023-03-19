export interface IAccount {
    id?: number;
    userId: number;
    name: string;
    type: AccountType;
    balance: number;
}
export class Account implements IAccount{
    constructor(initialValues: IAccount) {
        Object.assign(this, initialValues);
    }

    id?: number;
    userId!: number;
    name!: string;
    type!: AccountType;
    balance!: number;
}

export enum AccountType {
    General,
    Savings,
    Currency
}