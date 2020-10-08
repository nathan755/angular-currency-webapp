// Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// My Components
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { GraphComponent } from './components/graph/graph.component';
import { CurrencyConverterComponent } from './components/currency-converter/currency-converter.component';
import { TickerListComponent } from './components/ticker-list/ticker-list.component';
import { TickerItemComponent } from './components/ticker-item/ticker-item.component';
import { DateRangeComponent } from './components/date-range/date-range.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// other stuff
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from "@angular/material/core";
import {MatFormFieldModule} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    GraphComponent,
    CurrencyConverterComponent,
    TickerListComponent,
    TickerItemComponent,
    DateRangeComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    ReactiveFormsModule
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
