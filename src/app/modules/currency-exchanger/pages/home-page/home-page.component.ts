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
    let currencies = ['PLN', 'GBP', 'JPY', 'AED', 'ALL', 'AMD', 'ANG', 'ARS', 'AUD']
    this.subscription.add(
      this.currencyService.getExchangeRates(this.initData.from, currencies).subscribe((data: any) => {
        this.otherCurrencies = data
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
