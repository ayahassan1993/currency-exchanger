import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CurrencyService } from '../../services/currency.service';
import { OtherCurrencies } from '../../models/currency.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {
  subscription = new Subscription();
  otherCurrencies: OtherCurrencies[] = [];
  amount = 1;
  selectedCurrency = 'EUR'
  constructor(private currencyService: CurrencyService) { }

  ngOnInit() {
  }

  getExchangeRates(): void {
    this.subscription.add(
      this.currencyService.getExchangeRates(this.selectedCurrency).subscribe((data: any) => {
        this.otherCurrencies = Object.keys(data?.conversion_rates)
          .slice(1, 10).map((key) => { return { key: key, value: (+data?.conversion_rates[key] * this.amount) } });
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
