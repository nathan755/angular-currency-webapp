import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor() { }
  
  startDate;
  endDate;

  ngOnInit(): void {
  }

  dateRangeChanged(event){
    console.log("event", event)
    this.startDate = event.start;
    this.endDate = event.end;
  }



}
