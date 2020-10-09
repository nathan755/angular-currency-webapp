import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DataFetchingService } from "../../services/data-fetch/data-fetching.service";

@Component({
	selector: 'app-currency-converter',
	templateUrl: './currency-converter.component.html',
	styleUrls: ['./currency-converter.component.scss']
})
export class CurrencyConverterComponent implements OnInit {
	
	tickers:string[] = [];
	rates:object;
	error:boolean = false;

	amount = new FormControl();
	currencyOne = new FormControl();
	currencyTwo = new FormControl();
	
	constructor(private dataFetchingService:DataFetchingService ) { }

	onConvertClick(){}
	
	ngOnInit(): void {
		this.dataFetchingService.fetchCurrencyData(false).subscribe((res) => {
			this.rates = res.rates;
			this.tickers = Object.keys(res.rates)
		},
			(err) => {
				console.log("err", err)
				this.error = true;
			});
		}
}
