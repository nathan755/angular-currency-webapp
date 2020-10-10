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

	ngOnInit(): void {}

	title = 'currency';
}
