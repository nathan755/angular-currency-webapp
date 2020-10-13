import { Component, OnInit, Input } from '@angular/core';
import { DateRangeService } from "../../services/date-range/date-range.service";
import { DataFetchingService } from "../../services/data-fetch/data-fetching.service";
@Component({
	selector: 'app-ticker-list',
	templateUrl: './ticker-list.component.html',
	styleUrls: ['./ticker-list.component.scss']
})
export class TickerListComponent implements OnInit {
	// set default start and end. then when the date range chaegs => update it 
	start: string;
	end: string;
	tickers: string[];
	error: boolean;

	@Input() data;
	
	constructor(private dateRange: DateRangeService, private dataService: DataFetchingService) { }

	ngOnInit(): void {
		this.dataService.fetchCurrencyData(false).subscribe((res) => {
			this.tickers = Object.keys(res.rates)
		},
			(err) => {
				console.log("err", err)
				this.error = true;
			});

		this.dateRange.dateRange$.subscribe(
			range => {
				this.start = range.start;
				this.end = range.end;
			}
		);
	}
}
