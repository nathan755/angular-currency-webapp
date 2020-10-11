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
	constructor( private dataService: DataFetchingService) { }

	ngOnInit(): void {
		//build inital config  for highcharts => wait for user input to add data.
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
				}
			},
			xAxis: {
				type: "datetime",
			},
			credits: {
				enabled: false
			},
		};
		

	
		this.chartOptions = config;
	}

	ngOnChanges(): void {
		console.log("data", this.data)
		if(this.data !== undefined){
			// this.updateFlag = true
			this.dataArray.push(this.data[0])
			
		}
		console.log("dataArrayu", this.dataArray)
		console.log("this.chartOptions",this.chartOptions)
		this.chartOptions = {...this.chartOptions, series:this.dataArray}
	}


}
// {name:"test", data:this.dummyData},{name:"test1", data:this.dummy1data}