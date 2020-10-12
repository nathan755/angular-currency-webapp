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

		const lastMonday = moment().startOf('isoWeek').subtract(7, "days").format("YYYY-MM-DD");
		const lastFriday = moment(lastMonday).add(4, "days").format("YYYY-MM-DD");

		this.dataFetchingService.fetchCurrencyData(true, { start_at: lastMonday, end_at: lastFriday, base: "USD" }).subscribe(
			(res) => {
				// Get last Monday and Fridays rates and compare the rise / fall.
				const percentChangeArray = this.compareRates(res.rates[lastMonday], res.rates[lastFriday]);

				// Sort the array from lowest rise to highest.
				percentChangeArray.sort((a, b) => (a.percentChange) - (b.percentChange));

				// Remove USD from the array because all rates are compared against the USD.
				const indexOfUSD = percentChangeArray.findIndex((item) => item.ticker === "USD")
				percentChangeArray.splice(indexOfUSD, 1)

				// Get top three risers and fallers.
				const len = percentChangeArray.length;
				this.fallers = [percentChangeArray[0], percentChangeArray[1], percentChangeArray[2]];
				this.risers = [percentChangeArray[len - 1], percentChangeArray[len - 2], percentChangeArray[len - 3]];
			},
			(err) => {
				console.log("err", err)
			}
		);
	}

	compareRates(mondayRates: object, latestRates: object): Array<comparsionOutput> {
		
		const outputArray: Array<comparsionOutput> = [];

		// Convert the rate object into array.
		const latestRatesArray = Object.keys(latestRates).map(item => { return { ticker: item, price: latestRates[item] } });
		
		// loop over latest rates array => calculate percentage diff between last friday and last monday => push result into output array.
		const length = latestRatesArray.length;
		for (let i = 0; i < length; i++) {
			// Ticker = current currency ticker i.e USD
			const ticker: string = latestRatesArray[i].ticker;

			// grab both prices to compare.
			const fridayPrice: number = latestRatesArray[i].price;
			const mondayPrice: number = mondayRates[ticker];

			// Percent change between friday and monday.
			const difference: number = fridayPrice - mondayPrice;
			const percentChange = (difference / mondayPrice) * 100;
			outputArray.push({ ticker, percentChange:percentChange.toFixed(4), latestPrice:fridayPrice.toFixed(3) });
		}
		return outputArray;
	}
}
