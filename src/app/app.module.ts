import { MatSliderModule } from '@angular/material/slider';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { GraphComponent } from './components/graph/graph.component';
import { CurrencyConverterComponent } from './components/currency-converter/currency-converter.component';
import { TickerListComponent } from './components/ticker-list/ticker-list.component';
import { TickerItemComponent } from './components/ticker-item/ticker-item.component';
import { DateRangeComponent } from './components/date-range/date-range.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    GraphComponent,
    CurrencyConverterComponent,
    TickerListComponent,
    TickerItemComponent,
    DateRangeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
