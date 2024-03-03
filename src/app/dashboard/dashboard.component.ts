import { Component, OnInit } from '@angular/core';
import { CodebaseService } from '../codebase.service';
import { faArrowCircleRight, faArrowsRotate } from '@fortawesome/free-solid-svg-icons'; 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  
  arrowRight: any;
  arrowRotate: any;
  
  constructor(public codebase: CodebaseService) {
    this.codebase.runningNav = [];
    this.arrowRight = faArrowCircleRight;
    this.arrowRotate = faArrowsRotate;
  }

  ngOnInit(): void {
  }

  get totalCount() {
    return this.codebase.analytics ? this.codebase.analytics.total_count : 0;
  }

  get monthCount() {
    return this.codebase.analytics ? this.codebase.analytics.month_count : 0;
  }

  get prevMonthCount() {
    return this.codebase.analytics ? this.codebase.analytics.prev_month_count : 0;
  }

  get monthFocus() {
    return this.codebase.analytics ? this.codebase.analytics.month_focus : "";
  }
}
