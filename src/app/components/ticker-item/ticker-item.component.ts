import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-ticker-item',
	templateUrl: './ticker-item.component.html',
	styleUrls: ['./ticker-item.component.scss']
})
export class TickerItemComponent implements OnInit {

	@Input() start:string;
	@Input() end:string;

	constructor() { }

	ngOnInit(): void {
	}
	ngOnChanges():void {
	console.log("change please", this.end)
	console.log("change please", this.start)

	}

}
