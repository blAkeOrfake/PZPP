export interface IUser {
    id: string;
    username?: string;
    password?: string;
    token?: string;
}
export class User {
    id: string;
    username?: string;
    password?: string;
    token?: string;

    constructor(initialValues: IUser) {
        Object.assign(this, initialValues);
        this.id = initialValues.id || '0';
        this.username = initialValues.username || '';
        this.password = initialValues.password || '';
        this.token = initialValues.token || '';
    }
}

export interface IPerson extends IUser {
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    address?: string;
    city?: string;
    postalCode?: string;
    country?: string;
    contactAddress?: string;
    contactCity?: string;
    contactPostalCode?: string;
    taxAddress?: string;
    taxCity?: string;
    taxPostalCode?: string;
}
export class Person extends User implements IPerson {
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    address?: string;
    city?: string;
    postalCode?: string;
    country?: string;
    contactAddress?: string;
    contactCity?: string;
    contactPostalCode?: string;
    taxAddress?: string;
    taxCity?: string;
    taxPostalCode?: string;

    constructor(initialValues: IPerson) {
        super(initialValues);
        Object.assign(this, initialValues);
        this.firstName = initialValues.firstName || 'My name';
        this.lastName = initialValues.lastName || '';
    }

    getFullName(): string { return this.firstName + ' ' + this.lastName; }
}