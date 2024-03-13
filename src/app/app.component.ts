import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CodebaseService } from './codebase.service';
import { environment } from '../environments/environment';
import { Title } from '@angular/platform-browser';
import { faBars, faPause, faPlay, faStop, faStopwatch } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  visible = false;

  startTimerIcon: any = faStopwatch;
  pauseIcon: any = faPause;
  playIcon: any  = faPlay;
  stopIcon: any = faStop;
  barsIcon: any = faBars;

  title = 'Codebase';
  year = new Date().getFullYear();

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  isActive(menuName: string): boolean {
    return this.router.isActive(`/problem/type/${menuName}`, true);
  }


  constructor(private titleService: Title, public codebase: CodebaseService, private router: Router) {
    this.titleService.setTitle(this.title);
  }

  get isDashboardActive() {
    return this.codebase.isDashboardRunning;
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
  
  ngOnInit(): void {
    this.codebase.getData();
  }

}
