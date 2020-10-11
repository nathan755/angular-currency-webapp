import { Component, OnInit, Input } from '@angular/core';
import { DataFetchingService } from "../../services/data-fetch/data-fetching.service";
import * as moment from 'moment';

interface comparsionOutput {
	ticker: string,
	percentChange:any,
	latestPrice:number|string
}

@Component({
	selector: 'app-risers-fallers',
	templateUrl: './risers-fallers.component.html',
	styleUrls: ['./risers-fallers.component.scss']
})
export class RisersFallersComponent implements OnInit {
	
	constructor(private dataFetchingService: DataFetchingService) { }
	
	risers: Array<comparsionOutput>;
	fallers: Array<comparsionOutput>;

	
	ngOnInit(): void {
		// rename 
		const today = moment().subtract(2,"days").format("YYYY-MM-DD");
		const yesterday = moment().subtract(3, "days").format("YYYY-MM-DD");

		this.dataFetchingService.fetchCurrencyData(true, { start_at: yesterday, end_at: today, base: "USD" }).subscribe(
			(res) => {
				// percentChangeArray = array of percent changes between yesterday and today.
				const percentChangeArray = this.compareRates(res.rates[yesterday], res.rates[today]);
				// sort => percentChangeArray
				percentChangeArray.sort((a, b) => (a.percentChange) - (b.percentChange));
				const indexOfUSD = percentChangeArray.findIndex((item) => item.ticker === "USD")
				percentChangeArray.splice(indexOfUSD,1)
				const len = percentChangeArray.length;
				this.fallers = [percentChangeArray[0], percentChangeArray[1], percentChangeArray[2]];
				this.risers = [percentChangeArray[len - 1], percentChangeArray[len - 2], percentChangeArray[len - 3]];
			},
			(err) => {
				console.log("err", err)
			}
		);
	}





	compareRates(yesterdayRates: object, latestRates: object): Array<comparsionOutput> {
		const outputArray: Array<comparsionOutput> = [];
		// convert the rates objects into arrays.
		const latestRatesArray = Object.keys(latestRates).map(item => { return { ticker: item, price: latestRates[item] } });
		// loop over latest rates => calculate percentage diff between yesterdays and latest => push result into output array.
		const length = latestRatesArray.length;
		for (let i = 0; i < length; i++) {
			// ticker = current currency ticker i.e USD
			const ticker: string = latestRatesArray[i].ticker;
			const latestPrice: number = latestRatesArray[i].price;
			// grab yesterdays price for current currency
			const yesterdayPrice: number = yesterdayRates[ticker];
			const difference: number = latestPrice - yesterdayPrice;
			const percentChange = (difference / yesterdayPrice) * 100;
			outputArray.push({ ticker, percentChange:percentChange.toFixed(4), latestPrice:latestPrice.toFixed(3) });
		}
		return outputArray;
	}
}
