import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Currency } from '../../models/currency.model';

@Component({
  selector: 'app-currancy-exchanger',
  templateUrl: './currancy-exchanger.component.html',
  styleUrls: ['./currancy-exchanger.component.scss']
})
export class CurrancyExchangerComponent implements OnInit, OnDestroy {
  @Output() currencyChanged = new EventEmitter();

  subscription = new Subscription();
  currencies: Currency[] = []
  converterForm: FormGroup = new FormGroup({
    value: new FormControl(1, [Validators.required, Validators.min(1)]),
    from: new FormControl('EUR', [Validators.required]),
    to: new FormControl('USD', [Validators.required])
  })

  result = 0
  convertedCurrencyValue = 0
  showResult = true

  constructor(private currencyService: CurrencyService) { }

  ngOnInit() {
    this.getCurrencies()
    this.convertCurrency()
  }

  getCurrencies() {
    this.subscription.add(
      this.currencyService.getCurrencies().subscribe({
        next: (res: Currency[]) => {
          this.currencies = res
        },
        error: (err: any) => { }
      })
    )
  }

  convertCurrency(): void {
    this.subscription.add(
      this.currencyService.convertCurrency(this.getController('from').value, this.getController('to').value).subscribe(
        (res: number) => {
          this.convertedCurrencyValue = res;
          this.result = res * this.getController('value')?.value;
          this.showResult = true;
          this.currencyChanged.emit({ currency: this.getController('from').value, amount: this.getController('value')?.value })
        })
    )
  }

  getController(control: string) {
    return this.converterForm.controls[control];
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
