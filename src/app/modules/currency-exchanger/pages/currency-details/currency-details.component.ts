import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';
import { Subscription } from 'rxjs';
import { FormInitData } from '../../models/currency.model';
import { ActivatedRoute } from '@angular/router';
import * as Highcharts from 'highcharts';
import { CurrancyExchangerComponent } from '../../components/currancy-exchanger/currancy-exchanger.component';

@Component({
  selector: 'app-currency-details',
  templateUrl: './currency-details.component.html',
  styleUrls: ['./currency-details.component.scss']
})
export class CurrencyDetailsComponent implements OnInit, OnDestroy {
  @ViewChild('currencyExchanger') currencyExchanger !: CurrancyExchangerComponent
  subscription = new Subscription();
  initData: FormInitData = new FormInitData();

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {}
  monthes = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  selectedCurrencyName = ''

  constructor(private currencyService: CurrencyService, private activateRout: ActivatedRoute) { }

  ngOnInit() {
    this.activateRout.queryParams.subscribe((params: any) => {
      this.initData = params;
      this.currencyExchanger ? this.currencyExchanger.convertCurrency() : null;
    })
    this.initChart();
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
        categories: [...this.monthes]
      },
      series: []
    };
  }

  getExchangeRates() {
    this.chartOptions.series = [];
    this.subscription.add(
      this.currencyService.getMonthlyHistoricalRates(this.initData.from, this.initData.to).subscribe((data: any) => {
        let series: any = [{
          name: this.initData.to,
          data: []
        }]
        this.monthes.forEach((mounth, index) => {
          let date = new Date(new Date().getFullYear() - 1, index + 1, 1).toISOString().split('T')[0];
          series[0]['data'].push(data[date][this.initData?.from + this.initData.to])
        })
        this.chartOptions.series = [...series]
      })
    )
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
