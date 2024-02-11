import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CurrencyService } from '../../services/currency.service';
import { FormInitData, OtherCurrencies } from '../../models/currency.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnDestroy {
  subscription = new Subscription();
  otherCurrencies: OtherCurrencies[] = [];
  initData: FormInitData = new FormInitData();

  constructor(private currencyService: CurrencyService) { }

  getExchangeRates(): void {
    this.subscription.add(
      this.currencyService.getExchangeRates(this.initData.from).subscribe((data: any) => {
        this.otherCurrencies = Object.keys(data?.conversion_rates)
          .slice(1, 10).map((key) => { return { key: key, value: (+data?.conversion_rates[key] * this.initData.value) } });
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
