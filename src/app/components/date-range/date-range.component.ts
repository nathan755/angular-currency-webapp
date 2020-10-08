import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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
  
  constructor() { }

  ngOnInit(): void {
  }

  onDateSubmit(){
    console.log("send new date range", this.range.value)
    this.newDateRange.emit(this.range.value);
  }




  






}
