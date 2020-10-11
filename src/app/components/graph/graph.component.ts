import { Component, OnInit, Input } from '@angular/core';
import { DataFetchingService } from "../../services/data-fetch/data-fetching.service";
import * as Highcharts from 'highcharts';

@Component({
	selector: 'app-graph',
	templateUrl: './graph.component.html',
	styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {
	
	Highcharts: typeof Highcharts = Highcharts;
	chartOptions;
	updateFlag:boolean;
	@Input() data;
	dataArray = []
	test:boolean
	constructor( private dataService: DataFetchingService) { }

	ngOnInit(): void {
		const config = {
			title: { text: "CLick on graphs above to compare" },
			chart: {
				type: 'spline',
				height:null,
				width:null
			},
			series:[{name:"", data:[1]}],
			yAxis: {
				title:{
					text:"Exchange Rate"
				},
		
				
			},
			xAxis: {
				type: "datetime",
				
			},
			credits: {
				enabled: false
			},
		};
		this.chartOptions = config;

		let test = [
			[1602025200000, 1.2910],
			[1602025200000, 1.3238],
			[1602025200000, 1.3208],
			[1602025200000, 1.3160],
			[1602025200000, 1.2806],
			[1602025200000, 1.2541],
			[1602025200000, 1.2278],
			[1602025200000, 1.2406],

		]
		let test2 = [
			[1602025200000, 8.72],
			[1602025200000, 8.51],
			[1602025200000, 8],
			[1602025200000, 8.5],
			[1602025200000, 10],
			[1602025200000, 1.5],
			[1602025200000, 3.2],
			[1602025200000, 3.2],

		]
		let result = this.convertToPercentageChange(test2);
		console.log("result",result)






	}

	ngOnChanges(): void {
		console.log("data", this.data[0])
		if(this.data !== undefined){
			// convert prices into percentage var
			
			const convertedPrices = this.convertToPercentageChange(this.data[0].data);
			const formattedData = {"name":this.data[0].name, data:convertedPrices};


			this.dataArray.push(formattedData)
			
		}
		
		
		this.chartOptions = {...this.chartOptions, series:this.dataArray}
		this.test = true
	}

	convertToPercentageChange(data:Array<number[]>):Array<number[]>{
		// function converts exchange rates to percent change so the data can be compared against other currencies.
		const length = data.length;
		const output = [];
		for(let i=0; i<length-1; i++){
			const previous = data[i][1]
			const current = data[i+1][1];
			const result = ((current - previous) / previous)*100;
			output.push([data[i][0], result]);
		}
		return output; 	
	}


}
