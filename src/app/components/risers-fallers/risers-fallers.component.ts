import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-risers-fallers',
	templateUrl: './risers-fallers.component.html',
	styleUrls: ['./risers-fallers.component.scss']
})
export class RisersFallersComponent implements OnInit {

	constructor() { }

	todayRates:object;
	yesterdayRates:object;

	//yesterday
	test:object =  {
        CAD: 1.3176769818,
        HKD: 7.7500635863,
        ISK: 138.0245866893,
        PHP: 48.395930479,
        DKK: 6.3096227215,
        HUF: 302.0601949979,
        CZK: 22.9843153879,
        GBP: 0.7729292073,
        RON: 4.1301398898,
        SEK: 8.8342518016,
        IDR: 14701.1530309453,
        INR: 73.0805426028,
        BRL: 5.5782958881,
        RUB: 77.1015684612,
        HRK: 6.4234845273,
        JPY: 105.9347181009,
        THB: 31.0546841882,
        CHF: 0.9133531157,
        EUR: 0.8478168716,
        MYR: 4.1380245867,
        BGN: 1.6581602374,
        TRY: 7.9083509962,
        CNY: 6.7017380246,
        NOK: 9.2092412039,
        NZD: 1.5108944468,
        ZAR: 16.4743535396,
        USD: 1.0,
        MXN: 21.2660449343,
        SGD: 1.3553200509,
        AUD: 1.3908435778,
        ILS: 3.3793132683,
        KRW: 1144.9936413735,
        PLN: 3.7899109792
	}
	
	test2 =  {
		CAD: 1.2874926894,
		HKD: 7.8496114964,
		ISK: 102.097084134,
		PHP: 51.6726543571,
		DKK: 6.2237446737,
		HUF: 262.235775754,
		CZK: 21.3075444899,
		GBP: 0.7371960899,
		RON: 3.8950622441,
		SEK: 8.8324003676,
		IDR: 13977.7007268778,
		INR: 66.8618932242,
		BRL: 3.546328014,
		RUB: 63.0642493107,
		HRK: 6.1859804495,
		JPY: 108.9230512156,
		THB: 31.7553680341,
		CHF: 0.9984125658,
		EUR: 0.8354916869,
		MYR: 3.9380065168,
		BGN: 1.6340546412,
		TRY: 4.2579162837,
		CNY: 6.3591778762,
		NOK: 8.0574818281,
		NZD: 1.425933662,
		ZAR: 12.6272036093,
		USD: 1.0,
		MXN: 19.1558191996,
		SGD: 1.3336118306,
		AUD: 1.3296850196,
		ILS: 3.6211880692,
		KRW: 1076.3806500125,
		PLN: 3.5544322834
	}




	ngOnInit(): void {
		const hope = this.compareRates(this.test, this.test2);
		console.log("hope",hope)
	}
	
	compareRates(yesterdayRates:object, latestRates:object){
		const outputArray:Array<object> = [];
		// convert the rates objects into arrays.
		const latestRatesArray = Object.keys(latestRates).map(item=>{return {ticker:item,price:latestRates[item]}});
		// loop over latest rates => calculate percentage diff between yesterdays and latest => push result into output array.
		const length = latestRatesArray.length;
		for(let i=0; i<length; i++){
			// ticker = current currency ticker i.e USD
			const ticker:string = latestRatesArray[i].ticker;
			const latestprice:number = latestRatesArray[i].price;
			// grab yesterdays price for current currency
			const yesterdayPrice:number = yesterdayRates[ticker];
			const difference:number = latestprice - yesterdayPrice;
			const percentChange:number = (difference/yesterdayPrice)*100;
			outputArray.push({ticker, percentChange});
		}
		return outputArray;
	}
}
