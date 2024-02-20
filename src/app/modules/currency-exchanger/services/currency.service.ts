import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CurrencyService {

    constructor(private http: HttpClient) { }

    getCurrencies() {
        return this.http.get('list').pipe(map((res: any) => Object.keys(res.currencies).map((key: any) => { return { currency: key, currencyName: res.currencies[key] } })));
    }

    getExchangeRates(from: string, to: string[]) {
        let today = new Date().toISOString().split('T')[0];
        return this.http.get(`timeframe?start_date=${today}&end_date=${today}&currencies=${to}&source=${from}`)
            .pipe(map((res: any) => Object.keys(res.quotes[today]).map((key: any) => { return { key: key, value: res.quotes[today][key] } })));
    }

    convertCurrency(from: string, to: string) {
        return this.http.get(`convert?to=${to}&from=${from}&amount=1`).pipe(map((res: any) => res?.result));
    }

    getMonthlyHistoricalRates(from: string, to: string) { // this API doesn't support for free version
        const year = new Date().getFullYear() - 1;
        const fromDate = new Date(year, new Date().getMonth(), 1).toISOString().split('T')[0];
        const toDate = new Date(year, 12, 1).toISOString().split('T')[0];
        return this.http.get(`timeframe?start_date=${fromDate}&end_date=${toDate}&currencies=${to}&source=${from}`)
            .pipe(map((res: any) => res.quotes));
    }

}