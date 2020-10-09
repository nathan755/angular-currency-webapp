import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DateRangeService } from "../../services/date-range/date-range.service";

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss']
})
export class DateRangeComponent implements OnInit {
  range = new FormGroup({
    start:new FormControl(),
    end:new FormControl()
  });
  
  @Output() newDateRange = new EventEmitter<object>();
  
  constructor(private _interactionService:DateRangeService) { }

  ngOnInit(): void {
  }

  onDateSubmit(){
    // call dispatchDateRange from date-range-service
    this._interactionService.dispatchDateRange(this.range.value)
  }




  






}
