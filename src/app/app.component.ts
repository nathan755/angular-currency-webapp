import { Component } from '@angular/core';
import { DateRangeService } from "./services/date-range/date-range.service";
import * as moment from 'moment';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	
	constructor(private dateRange: DateRangeService) { }

	ngOnInit(): void {
		// on app init manually set default date range to be lastg 7 days
		// not today because there is not data for "today"
		// const start = moment().subtract(1, "days").format("YYYY-MM-DD");
		// const end = moment().subtract(7, "days").format("YYYY-MM-DD");
		// console.log("here",start,start)
		// this.dateRange.dispatchDateRange({start, end});
	
	}

	title = 'currency';
}
