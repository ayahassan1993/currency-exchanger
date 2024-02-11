import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Currency, FormInitData } from '../../models/currency.model';

@Component({
  selector: 'app-currancy-exchanger',
  templateUrl: './currancy-exchanger.component.html',
  styleUrls: ['./currancy-exchanger.component.scss']
})
export class CurrancyExchangerComponent implements OnInit, OnDestroy {
  @Input() isDetails: boolean = false;
  @Input() initData: FormInitData = new FormInitData();
  @Output() currencyChanged = new EventEmitter();
  @Output() fromValueChanged = new EventEmitter();

  subscription = new Subscription();
  currencies: Currency[] = []
  converterForm: FormGroup = this.initForm()
  result = 0
  convertedCurrencyValue = 0
  showResult = true
  selectedCurrencyName = ''

  constructor(private currencyService: CurrencyService) { }

  ngOnInit() {
    this.getCurrencies()
    this.convertCurrency()
    this.checkAmountChanges()
  }

  ngOnChanges() {
    this.converterForm = this.initForm()
  }

  checkAmountChanges() {
    this.subscription.add(
      this.getController('from').valueChanges.subscribe(
        value => {
          this.showResult = false
          if (value) {
            this.getController('from').disable();
            this.getController('to').disable()
          }
          else {
            this.getController('from').enable();
            this.getController('to').enable();
          }
        }
      )
    )
  }

  initForm() {
    return new FormGroup({
      value: new FormControl(this.initData.value, [Validators.required, Validators.min(1)]),
      from: new FormControl({ value: this.initData?.from, disabled: this.isDetails }, [Validators.required]),
      to: new FormControl(this.initData?.to, [Validators.required])
    })
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
          this.fromChanged();
          this.currencyChanged.emit({ ...this.converterForm.getRawValue() })
        })
    )
  }

  fromChanged() {
    this.selectedCurrencyName = this.currencies.find(cur => cur.currency == this.getController('from').value)?.currencyName || '';
    this.fromValueChanged.emit(this.selectedCurrencyName)
  }

  swapCurrency() {
    let from = this.getController('to').value;
    this.getController('to').setValue(this.getController('from').value)
    this.getController('from').setValue(from)
    this.showResult = false;
  }

  getController(control: string) {
    return this.converterForm.controls[control];
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
