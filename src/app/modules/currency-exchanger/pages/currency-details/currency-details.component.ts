import { Component, OnDestroy, OnInit } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';
import { Subscription } from 'rxjs';
import { FormInitData } from '../../models/currency.model';
import { ActivatedRoute } from '@angular/router';
import * as Highcharts from 'highcharts';
import { data } from '../../constants/data.constant';

@Component({
  selector: 'app-currency-details',
  templateUrl: './currency-details.component.html',
  styleUrls: ['./currency-details.component.scss']
})
export class CurrencyDetailsComponent implements OnInit, OnDestroy {
  subscription = new Subscription();
  initData: FormInitData = new FormInitData();

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {}

  selectedCurrencyName = ''
  constructor(private currencyService: CurrencyService, private activateRout: ActivatedRoute) { }

  ngOnInit() {
    this.activateRout.queryParams.subscribe((params: any) => this.initData = { ...params })
    this.initChart();
    this.getExchangeRates()
  }

  initChart() {
    this.chartOptions = this.chartOptions = {
      chart: {
        type: 'line'
      },
      title: {
        text: 'Monthly Currency Chart'
      },
      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      series: [...data]
    };
  }

  getExchangeRates() { // this Api is not for the free subscription so I used a dummy data
    this.subscription.add(
      this.currencyService.getMonthlyHistoricalRates(this.initData?.from).subscribe(data => console.log(data))
    )
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
