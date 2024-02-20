export type UserProps = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: {
        id: number;
        name: string;
    }
    status: UserStatusEnum;
    currency: CurrencyEnum;
};

export const API_URL = 'https://localhost:7289/api'

export enum CurrencyEnum {
    PLN,
    USD,
    EUR,
    GBP,
    CHF
};

export enum UserStatusEnum {
    Ok,
    Blocked
}
