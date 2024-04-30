import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { faStopwatch, faPause, faPlay, faStop, faBars, faLink, faCalendar, faBook, faThumbTack, faVideo, faPlus, faTrash, faFileAlt, faCircleHalfStroke, faMoon, faSun, faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CodebaseService } from '../codebase.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  visible = false;
  selectedUploadOption: number = 1;

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
  sheetIcon: any = faBookOpen;

  year = new Date().getFullYear();

  public filesForm = new FormGroup({
    files: new FormControl<File[]>([]),
  });
  
  isModalVisible: any = {
    'playlist': false,
    'event': false,
    'link': false,
    'tracker': false,
    'note': false,
    'sheet': false
  };

  showModal = false;
  showModalType = "";
  showModalItem: any;

  get switchTheme(): any {
    return this.codebase.runningTheme == 'dark' ? faSun : faMoon;
  }

  get themeType(): string {
    return this.codebase.runningTheme == 'dark' ? 'Light' : 'Dark';
  }

  get name(): string {
    return this.codebase.appName;
  }

  get icon(): string {
    return this.codebase.appIcon;
  }

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

  get sheets() {
    return this.codebase.sheets;
  }

  get notes() {
    return this.codebase.notes;
  }

  get playlists() {
    return this.codebase.playlists;
  }

  isActive(slug: string): boolean {
    return this.router.isActive(`/problem/type/${slug}`, true);
  }


  constructor(public codebase: CodebaseService, private router: Router, private message: NzMessageService, private http: HttpClient) {
    
  }

  get isDashboardActive() {
    return this.codebase.isDashboardRunning;
  }

  get showStartTimer() {
    return this.codebase.timerRunning;
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

  openShowModal(type: string, item: any) {
    this.showModal = true;
    this.showModalType = type;
    this.showModalItem = item;
  }

  hideShowModal() {
    this.showModal = false;
  }

  handleIndexChange(index: number) {
    this.selectedUploadOption = index;
  }

  handleCancel(type: string) {
    this.isModalVisible[type] = false;
    this.selectedUploadOption = 1;
    this.filesForm?.get('files')?.setValue([]);
  }

  handleConfirm(type: string) {
    if(this.selectedUploadOption==1) {
      var length: number | undefined = this.filesForm.get('files')?.value?.length;
      if(!length || length == 0) {
        this.message.error('No files are selected.....');
      }
      
      const uploadData = new FormData();
      uploadData.append('type', type);
      uploadData.append('parse', "true");
      const selectedFiles = this.filesForm.get('files')?.value;
      if(selectedFiles) {
        selectedFiles.forEach(file => {
          uploadData.append('files[]', file, file.name);
        });
      }

    this.http.post(`${environment.baseURL}/upload`, uploadData)
      .subscribe(
        (response: any )=> {
          if(response['files']) {
            this.message.warning("Some Files Are Not Parsed See Upload Log For More Info....");
          } else {
            this.message.success("Data Added Successfully....");
          }
        },
        error => {
          this.message.warning("System is unable to upload the files....");
        }
      );
    }
  }
}
