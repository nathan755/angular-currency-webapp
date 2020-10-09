import { Component, OnInit, Input } from '@angular/core';
import { DateRangeService } from "../../services/date-range.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  
  constructor(private _interactionService:DateRangeService) { }
  
  startDate:string;
  endDate:string;

  ngOnInit(): void {
    // subscribe to date range service
    this._interactionService.dateRange$.subscribe(dateRange =>{
      this.startDate = dateRange.start;
      this.endDate = dateRange.end;
    });
  }
}
