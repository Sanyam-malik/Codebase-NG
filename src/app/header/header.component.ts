import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { faStopwatch, faPause, faPlay, faStop, faBars, faLink, faCalendar, faBook, faThumbTack, faVideo, faPlus, faTrash, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CodebaseService } from '../codebase.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  visible = false;
  selectedUploadOption: number = 0;

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

  year = new Date().getFullYear();

  public filesForm = new FormGroup({
    files: new FormControl<File[]>([]),
  });
  
  isModalVisible: any = {
    'playlist': false,
    'event': false,
    'link': false,
    'tracker': false,
    'note': false
  };

  get modalType() {
    var type: string = '';
    for(const [key, value] of Object.entries(this.isModalVisible)) {
      if(value == true) {
        type = key;
        break;
      }
    }
    return type;
  }

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


  constructor(public codebase: CodebaseService, private router: Router, private message: NzMessageService) {
    
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

  handleIndexChange(index: number) {
    this.selectedUploadOption = index;
  }

  handleCancel(type: string) {
    this.isModalVisible[type] = false;
    this.selectedUploadOption = 0;
  }

  handleConfirm(type: string) {
    if(type == 'playlist') {
      var length: number | undefined = this.filesForm.get('files')?.value?.length;
      if(!length || length == 0) {
        this.message.error('No files are selected.....');
      }
    }
  }
}
