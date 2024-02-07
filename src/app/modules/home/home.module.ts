import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HomeRoutingModule } from './home-routing.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CurrancyExchangerComponent } from './components/currancy-exchanger/currancy-exchanger.component';



@NgModule({
  declarations: [
    HomePageComponent,
    CurrancyExchangerComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
  ]
})
export class HomeModule { }
