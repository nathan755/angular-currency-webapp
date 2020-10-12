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
	@Input() data;
	dataArray = []
	update:boolean
	
	constructor( private dataService: DataFetchingService) { }

	ngOnInit(): void {
		const config = {
			title: { text: "Click Graphs Above To Compare" },
			chart: {
				type: 'spline',
				height:600,
				width:1300
			},
			series:[{name:"", data:[1]}],
			yAxis: {
				title:{
					text:"Percent Variance"
				},
		
				
			},
			xAxis: {
				type: "datetime",
				title:{
					text:"Date Range"
				},
				
			},
			credits: {
				enabled: false
			},
		};
		this.chartOptions = config;
	}

	ngOnChanges(): void {
		if(this.data !== undefined){
			const convertedPrices = this.convertToPercentageChange(this.data[0].data);
			const formattedData = {"name":this.data[0].name, data:convertedPrices};
			this.dataArray.push(formattedData);
		}
		this.chartOptions = {...this.chartOptions, series:this.dataArray}
		this.update = true;
	}

	onClearClick():void{
		this.chartOptions = {...this.chartOptions, series:[{name:"", data:[1]}]};
		this.update = true;
		this.dataArray = [];
	}
	
	convertToPercentageChange(data:Array<number[]>):Array<number[]>{
		// function converts exchange rates to percent change so the data can be compared against other currencies.
		const length = data.length;
		const output = [];
		for(let i=0; i<length-1; i++){
			const previous = data[i][1];
			const current = data[i+1][1];
			const result = ((current - previous) / previous)*100;
			output.push([data[i][0], result]);
		}
		return output; 	
	}
}
