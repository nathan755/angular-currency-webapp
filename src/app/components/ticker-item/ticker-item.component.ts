import { Component, OnInit, Input } from '@angular/core';
import { DataFetchingService } from "../../services/data-fetch/data-fetching.service";
import * as moment from "moment";
import * as Highcharts from 'highcharts';

@Component({
	selector: 'app-ticker-item',
	templateUrl: './ticker-item.component.html',
	styleUrls: ['./ticker-item.component.scss']
})
export class TickerItemComponent implements OnInit {

	@Input() start: string;
	@Input() end: string;
	@Input() currency: string;

	startDate: string;
	endDate: string;
	error: boolean;
	rates: Array<object>;
	loading: boolean = true;

	Highcharts: typeof Highcharts = Highcharts;
	chartOptions;

	constructor(private dataFetchingService: DataFetchingService) { }

	ngOnInit(): void {
		// use last 7 days on init (not including today).
		const endDate = moment().subtract(2, "days").format("YYYY-MM-DD");
		const startDate = moment().subtract(7, "days").format("YYYY-MM-DD");
		const config = {
			title: { text: "USD/" + this.currency },
			chart: {
				height: 200,
				width: 200,
				type: 'spline',
			},
			legend: { enabled: false },
			series: [{
				name: "Exchange Rate",
				data: [1],
			}],
			yAxis: {
				title: {
					text: null
				}
			},
			xAxis: {
				type: "datetime",
			},



			credits: {
				enabled: false
			},

		};
		this.chartOptions = config
		this.fetchData(startDate, endDate, this.currency);
		this.loading = false;
	}

	ngOnChanges(): void {
		// once the user changes the date range use props
		if (!this.loading) {
			this.fetchData(this.start, this.end, this.currency);
		}
	}

	fetchData(start: string, end: string, currency: string): void {
		this.dataFetchingService.fetchCurrencyData(true, {
			start_at: start,
			end_at: end,
			symbols: currency,
			base: "USD"
		}).subscribe((res) => {
			const currencyPrices = this.formatData(res.rates);
			this.rates = currencyPrices
			const config = {
				title: { text: "USD/" + this.currency },
				chart: {
					height: 200,
					width: 200,
					type: 'spline',
				},
				legend: { enabled: false },
				series: [{
					name: "Exchange Rate",
					data: currencyPrices,
				}],
				yAxis: {
					title: {
						text: null
					}
				},
				xAxis: {
					type: "datetime",
				},
				credits: {
					enabled: false
				},

			};
			this.chartOptions = { ...config };

		},
			(err) => {
				console.log("err", err)
				this.error = true;
			});
	}

	formatData(data: object) {
		// format and sort data for highcharts config
		const formattedData = [];
		const array = Object.entries(data);
		const length = array.length;
		for (let i = 0; i < length; i++) {
			const timeStamp = moment(array[i][0]).unix();
			const price = array[i][1][this.currency];
			formattedData.push([timeStamp * 1000, price]);
		}
		formattedData.sort((a, b) => {
			return a[0] - b[0]
		});
		return formattedData;
	}

	ongraphClick(): void {
		
		this.dataFetchingService.dispatchData([{
			name: this.currency,
			data: this.rates,
		}]);
	}
}
