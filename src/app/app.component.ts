import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CodebaseService } from './codebase.service';
import { environment } from '../environments/environment';
import { Title } from '@angular/platform-browser';
import { faBars, faCalendar, faLink, faPause, faPlay, faStop, faStopwatch, faBook, faThumbTack, faVideo, faPlus, faTrash, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { FormControl, FormGroup } from '@angular/forms';
import { FileUploadValidators } from '@iplab/ngx-file-upload';

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
  linkIcon: any = faLink;
  calendarIcon: any = faCalendar;
  bookIcon: any = faBook;
  thumbtackIcon:any = faThumbTack;
  videoIcon: any = faVideo;
  plusIcon:any = faPlus;
  trashIcon:any = faTrash;
  fileIcon: any = faFileAlt;

  title = 'Codebase';
  year = new Date().getFullYear();

  public filesForm = new FormGroup({
    files: new FormControl<File[]>([]),
  });
  
  isModalVisible: boolean = false;

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  get reminders(){
    return this.codebase.reminders;
  }

  get trackers() {
    return this.codebase.trackers;
  }

  get platforms() {
    return this.codebase.platforms;
  }

  get notes() {
    return this.codebase.notes;
  }

  isActive(slug: string): boolean {
    return this.router.isActive(`/problem/type/${slug}`, true);
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

  handleCancel() {
    this.isModalVisible = false;
  }

  handleConfirm() {
    throw new Error('Method not implemented.');
  }

}
