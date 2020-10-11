import { Component } from '@angular/core';
import { DataFetchingService } from "./services/data-fetch/data-fetching.service";

import * as moment from 'moment';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	
	data;

	constructor( private dataService: DataFetchingService) { }
	
	ngOnInit(): void {
		this.dataService.data.subscribe( data => this.data = data )
	}

	title = 'currency';
}
