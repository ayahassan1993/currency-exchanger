export interface Currency {
    currency: string,
    currencyName: string
}

export interface OtherCurrencies { key: string, value: number }

export class FormInitData { value: number = 1; from: string = 'EUR'; to: string = 'USD'; }

