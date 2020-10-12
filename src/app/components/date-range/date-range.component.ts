import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateRangeService } from "../../services/date-range/date-range.service";
import * as moment from 'moment';

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss']
})
export class DateRangeComponent implements OnInit {
  range = new FormGroup({
    start:new FormControl("",Validators.required),
    end:new FormControl("",Validators.required)
  });
  
  @Output() newDateRange = new EventEmitter<object>();
  
  constructor(private _interactionService:DateRangeService) { }

  ngOnInit(): void {
  }
  
  onDateSubmit(){
    // call dispatchDateRange from date-range-service. ie send new date range to service.
    // any components subscriebd to the date range service will recieve the updated date raneg.
    
    const start = moment(this.range.value.start).format("YYYY-MM-DD");
    const end = moment(this.range.value.end).format("YYYY-MM-DD");
    
    this._interactionService.dispatchDateRange({start, end});
  }
}
