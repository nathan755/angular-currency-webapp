import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DateRangeService {
  
  private _dateRangeSource = new Subject<{start:string, end:string}>();
  dateRange$ = this._dateRangeSource.asObservable();

  constructor() { }
  
  dispatchDateRange(dateRange:{start:string, end:string}){
    //take in date range and send as observable
    //similar to redux action creator? 
    this._dateRangeSource.next(dateRange);
  }
}


