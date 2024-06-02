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

export type WalletProps = {
    id: number;
    name: string;
    details: string;
    createdDate: string;
    updatedDate: string;
    userId: number;
    currentValue: number;
    totalProfit: number;
    totalCost: number;
    currency: CurrencyEnum;
    percentageChange24h: number;
    percentageChange7d: number;
    percentageChange1m: number;
    percentageChange1y: number;
    assetPositions: AssetPosition[];
    assetCategoryPositions: AssetCategoryPosition[];
}

export type CreateWalletProps = {
    name: string;
    details: string;
}

export type AssetPosition = {
    assetId: number;
    assetName: string;
    assetCategoryId: number;
    assetCategoryName: AssetCategoryEnum;
    ticker: string;
    price: number;
    quantity: number;
    totalValue: number;
    totalCost: number;
    avgCost: number;
    profit: number;
    percentageInWallet: number;
    updatedDate: string;
    percentageChange24h: number;
    percentageChange7d: number;
    percentageChange1m: number;
    percentageChange1y: number;
}

export type AssetName = {
    id: number;
    name: string;
    ticker: string;
}

export type AssetCategoryPosition = {
    categoryId: number;
    categoryName: AssetCategoryEnum;
    percentageInWallet: number;
    totalValue: number;
    totalProfit: number;
    totalCost: number;
    percentageChange24h: number;
    percentageChange7d: number;
    percentageChange1m: number;
    percentageChange1y: number;
}

export type Transaction = {
    id: number;
    assetId: number;
    assetName: string;
    assetTicker: string;
    walletId: string;
    type: TransactionEnum;
    price: number;
    quantity: number;
    initialValue: number;
    currency: CurrencyEnum;
    transactionDate: string;
}

export type CreateTransactionProps = {
    assetId: number;
    type: string;
    quantity: number;
    initialValue: number;
    transactionDate: string;
}

export const API_URL = 'https://localhost:7289/api';

export enum TransactionEnum {
    Sell,
    Buy
}

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
    {
  "assetId": 0,
  "type": "string",
  "quantity": 0,
  "initialValue": 0,
  "transactionDate": "string"
}
} */
