export interface Itransaction {
    categoryCode: string;
    dates: {
        valueDate: Date
    };
    merchant: {
        accountNumber: string,
        name: string
    };
    transaction: {
        amountCurrency: {
            amount: number,
            currencyCode: string
        },
        creditDebitIndicator: string,
        type: string
    };
}
