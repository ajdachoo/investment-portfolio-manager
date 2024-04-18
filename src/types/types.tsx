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

export type SignInProps = {
    email: string;
    password: string;
};

export type RegisterUserProps = {
    firstName: string;
    lastName: string;
    password: string;
    confirmPassword: string;
    email: string;
    currency: string;
};

export type AssetProps = {
    id: number;
    name: string;
    ticker: string;
    category: AssetCategoryEnum;
    currentPrice: number;
    percentageChange24h: number;
    percentageChange7d: number;
    percentageChange1m: number;
    percentageChange1y: number;
    updatedDate: string;
    currency: CurrencyEnum;
};

export const API_URL = 'https://localhost:7289/api';

export enum CurrencyEnum {
    PLN,
    USD,
    EUR,
    GBP,
    CHF
};

export enum AssetCategoryEnum {
    PolishStocks = 'Polish stocks',
    Cryptocurrencies = 'Cryptocurrencies',
    USStocks = 'US stocks',
    PhysicalCurrencies = 'Physical currencies'
}

export enum UserStatusEnum {
    Ok,
    Blocked
};

/*export enum AssetCategoryEnum {
    PolishStocks = 'Polish stocks',
    Cryptocurrencies = 'Cryptocurrencies',
    USStocks = 'US stocks',
    PhysicalCurrencies = 'Physical currencies'
} */
