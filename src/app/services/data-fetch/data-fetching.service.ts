import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

interface response {
	rates:object
	base:string,
	date:string
}



@Injectable({
	providedIn: 'root'
})
export class DataFetchingService {
	
	baseUrlHistory:string = "https://api.exchangeratesapi.io/history";
	baseUrlLatest:string = "https://api.exchangeratesapi.io/latest";
	
	constructor(private request: HttpClient) { }

	fetchCurrencyData(history:boolean, params?:any, date?:string,):Observable<response>{
		if(history){
			// fetch data based on date range
			if(!params.start_at){
				throw new Error("Start Date Missing");
			}
			return this.request.get<response>(this.baseUrlHistory, {params:params});
		}
		else if(date){
			// fetch data based on one day
			return this.request.get<response>(`https://api.exchangeratesapi.io/${date}`, {params:params})
			
		}	
		else{
			// fetch latest data
			return this.request.get<response>(this.baseUrlLatest, {params:params});
		}
	}
}
