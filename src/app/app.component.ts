import { Component } from '@angular/core';
import { DataFetchingService } from "./services/data-fetch/data-fetching.service";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	
	data;
	
	constructor( private dataService: DataFetchingService) { }
	
	ngOnInit(): void {
		// Subscribe to data updates from ticker graphs.
		// Pass down to graph component.
		this.dataService.data.subscribe( data => this.data = data )
	}

	title = 'currency';
}
