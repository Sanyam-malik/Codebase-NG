import { Component, OnInit } from '@angular/core';
import { CodebaseService } from '../codebase.service';
import { faArrowCircleRight, faArrowsRotate, faCircleHalfStroke, faStopwatch } from '@fortawesome/free-solid-svg-icons'; 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  
  startTimerIcon: any = faStopwatch;
  arrowRight: any = faArrowCircleRight;
  arrowRotate: any = faArrowsRotate;
  switchTheme: any = faCircleHalfStroke;
  showStartTimer: boolean = false;

  minutes: number = 0;
  seconds: number = 0;
  timer: any;
  isPaused: boolean = false;
  
  constructor(public codebase: CodebaseService) {
    this.codebase.runningNav = [];
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

  get prevMonthFocus() {
    return this.codebase.analytics ? this.codebase.analytics.prev_month_focus : "";
  }

  startTimer() {
    this.showStartTimer = true;
    this.minutes = 0;
    this.seconds = 0;
    this.timer = setInterval(() => {
      if (!this.isPaused) {
        this.seconds++;
        if (this.seconds === 60) {
          this.seconds = 0;
          this.minutes++;
        }
      }
    }, 1000);
  }

  resumeTimer() {
    this.isPaused = false;
  }

  pauseTimer() {
    this.isPaused = true;
  }

  stopTimer() {
    this.showStartTimer = false;
    this.isPaused = false;
    clearInterval(this.timer);
  }
}
