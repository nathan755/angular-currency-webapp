import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
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


	converterForm = new	FormGroup({
		amount : new FormControl("",[Validators.required,this.numberValidator]),
		currencyOne : new FormControl("",Validators.required),
		currencyTwo : new FormControl("",Validators.required)
	},{updateOn:'submit'});


	
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
		if(this.converterForm.status === "INVALID") return;
		this.convertCurrency(this.converterForm.value.currencyOne, this.converterForm.value.currencyTwo);
	}

	convertCurrency(currencyOne: string, currencyTwo: string):void {
		// fetch currency rates for currencyOne.
		this.dataFetchingService.fetchCurrencyData(false, { base: currencyOne }).subscribe(
			(res) => {

				this.result = this.converterForm.value.amount * res.rates[this.converterForm.value.currencyTwo];
				console.log("result", this.result)
			},
			(err) => {
				console.log("err", err);
				this.error = true;
			});
	}



	
	numberValidator(control:AbstractControl): {[key:string]:any} {
		
		console.log("jello")
		console.log("control.value", control.value)
		const input = (isNaN(control.value))
		console.log("input",input)
		return input ? { "isNumber": { value: true } } : null;
	};
	

}
