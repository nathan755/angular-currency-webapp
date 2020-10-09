import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DataFetchingService } from "../../services/data-fetch/data-fetching.service";
//!! unsubsscibe ????
@Component({
	selector: 'app-currency-converter',
	templateUrl: './currency-converter.component.html',
	styleUrls: ['./currency-converter.component.scss']
})
export class CurrencyConverterComponent implements OnInit {
	
	tickers:string[] = [];
	rates:object;
	error:boolean = false;
	result:number;

	amount = new FormControl();
	currencyOne = new FormControl();
	currencyTwo = new FormControl();
	
	constructor(private dataFetchingService:DataFetchingService ) { }

	ngOnInit(): void {
		// fetch tickers for selects.
		this.dataFetchingService.fetchCurrencyData(false).subscribe((res) => {
			this.tickers = Object.keys(res.rates)
		},
			(err) => {
				console.log("err", err)
				this.error = true;
			});
	}

	onConvertClick():void{
		this.convertCurrency(this.currencyOne.value, this.currencyTwo.value);
	}

	convertCurrency(currencyOne: string, currencyTwo: string):void {
		// fetch currency rates for currencyOne.
		this.dataFetchingService.fetchCurrencyData(false, { base: currencyOne }).subscribe(
			(res) => {
				this.result = this.amount.value * res.rates[currencyTwo];
			},
			(err) => {
				console.log("err", err);
				this.error = true;
			});
	}
	

}
