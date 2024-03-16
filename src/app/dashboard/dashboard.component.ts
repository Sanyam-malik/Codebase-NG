import { Component, OnDestroy, OnInit } from '@angular/core';
import { CodebaseService } from '../codebase.service';
import { faArrowCircleRight, faArrowsRotate, faCircleHalfStroke, faStopwatch, faPause, faPlay, faStop } from '@fortawesome/free-solid-svg-icons'; 
import { faCodepen } from '@fortawesome/free-brands-svg-icons';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnDestroy {
  
  startTimerIcon: any = faStopwatch;
  pauseIcon: any = faPause;
  playIcon: any  = faPlay;
  stopIcon: any = faStop;
  arrowRight: any = faArrowCircleRight;
  arrowRotate: any = faArrowsRotate;
  switchTheme: any = faCircleHalfStroke;
  sessionIcon: any = faCodepen;
  urlValue: string = '';
  showPopOver: boolean = false;
  
  
  constructor(public codebase: CodebaseService, private router: Router, private message: NzMessageService) {
    this.codebase.runningNav = [];
    this.codebase.isDashboardRunning = true;
  }

  ngOnDestroy(): void {
    this.codebase.isDashboardRunning = false;
  }

  ngOnInit(): void {
  }

  get showStartTimer() {
    return this.codebase.showStartTimer;
  }

  get isPaused() {
    return this.codebase.isPaused;
  }

  get minutes() {
    return this.codebase.minutes;
  }

  get seconds() {
    return this.codebase.seconds;
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
    return this.codebase.analytics ? this.codebase.analytics.month_focus : "No Information";
  }

  get prevMonthFocus() {
    return this.codebase.analytics ? this.codebase.analytics.prev_month_focus : "No Information";
  }

  get todayCount() {
    return this.codebase.analytics ? this.codebase.analytics.today_count : 0;
  }

  startTimer() {
    this.codebase.startTimer();
  }

  resumeTimer() {
    this.codebase.resumeTimer();
  }

  pauseTimer() {
    this.codebase.pauseTimer();
  }

  stopTimer() {
    this.codebase.stopTimer();
  }
}
