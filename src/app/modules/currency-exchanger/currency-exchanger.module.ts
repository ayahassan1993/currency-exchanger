import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CurrencyExchangerRoutingModule } from './currency-exchanger-routing.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { CurrancyExchangerComponent } from './components/currancy-exchanger/currancy-exchanger.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CurrencyDetailsComponent } from './pages/currency-details/currency-details.component';



@NgModule({
  declarations: [
    HomePageComponent,
    CurrancyExchangerComponent,
    CurrencyDetailsComponent
  ],
  imports: [
    CommonModule,
    CurrencyExchangerRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
  ]
})
export class CurrencyExchangerModule { }
