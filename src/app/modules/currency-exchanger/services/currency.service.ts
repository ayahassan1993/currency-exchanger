import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CurrencyService {

    constructor(private http: HttpClient) { }

    getCurrencies() {
        return this.http.get('codes').pipe(map((res: any) => res.supported_codes.map((data: any) => { return { currency: data[0], currencyName: data[1] } })));
    }

    getExchangeRates(currency: string) {
        return this.http.get(`latest/${currency}?format=compact`)
    }

    convertCurrency(from: string, to: string) {
        return this.http.get(`pair/${from}/${to}`).pipe(map((res: any) => res?.conversion_rate));
    }

    getMonthlyHistoricalRates(base: string) { // this API doesn't support for free version
        const year = new Date().getFullYear() - 1;
        return this.http.get(`history/${base}/${year}/1/1`);
    }

}