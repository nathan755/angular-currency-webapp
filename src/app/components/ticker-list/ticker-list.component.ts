import { Component, OnInit } from '@angular/core';
import { DateRangeService } from "../../services/date-range/date-range.service";

@Component({
	selector: 'app-ticker-list',
	templateUrl: './ticker-list.component.html',
	styleUrls: ['./ticker-list.component.scss']
})
export class TickerListComponent implements OnInit {

	start: string;
	end: string;

	constructor(private dateRange: DateRangeService) { }

	ngOnInit(): void {
		this.dateRange.dateRange$.subscribe(
			range => {
				this.start = range.start;
				this.end = range.end;
			}
		)
	}



}
