import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { faStopwatch, faPause, faPlay, faStop, faBars, faLink, faCalendar, faBook, faThumbTack, faVideo, faPlus, faTrash, faFileAlt, faCircleHalfStroke, faMoon, faSun, faBookOpen, faEdit, faGlobe, faCodeBranch } from '@fortawesome/free-solid-svg-icons';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CodebaseService } from '../../services/codebase.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Branch } from '../../data-models/branch';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  recurrance_types = [
    {
      value: 'MONTHLY',
      text: 'Monthly'
    }, 
    {
      value: 'EVERY',
      text: 'Every'
    },
    {
      value: 'ONCE',
      text: 'Once'
    },
    {
      value: 'DAILY',
      text: 'Daily'
    }
  ]

  recurrance_subtypes = [
    {
      value: 'MONDAY',
      text: 'Monday'
    }, 
    {
      value: 'TUESDAY',
      text: 'Tuesday'
    },
    {
      value: 'WEDNESDAY',
      text: 'Wednesday'
    },
    {
      value: 'THURSDAY',
      text: 'Thursday'
    },
    {
      value: 'FRIDAY',
      text: 'Friday'
    },
    {
      value: 'SATURDAY',
      text: 'Saturday'
    },
    {
      value: 'SUNDAY',
      text: 'Sunday'
    }
  ]

  levelOptions = [
    'Easy',
    'Medium',
    'Hard'
  ];

  confirmSwitchModal?: NzModalRef;
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
  editIcon: any = faEdit;
  webIcon: any = faGlobe;
  branchIcon: any = faCodeBranch;

  year = new Date().getFullYear();

  public filesForm = new FormGroup({
    files: new FormControl<File[]>([]),
  });
  
  isModalVisible: any = {
    'event': false,
    'link': false,
    'tracker': false
  };

  showModal = false;
  showModalType = "";
  showModalItem: any;
  isOnEditMode = false;

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

  get addItem(): boolean {
    return this.codebase.isAdditionAllowed;
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


  constructor(public codebase: CodebaseService, private modal: NzModalService,
    private router: Router, private message: NzMessageService, private http: HttpClient) {
    
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

  get currentBranch(): string {
    return this.codebase.currBranch;
  }

  set currentBranch(value: string) {
    this.codebase.currBranch = value;
  }

  get branchInfo(): Branch | undefined {
    return this.codebase.branch;
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
    this.isOnEditMode = false;
  }

  handleIndexChange(index: number) {
    this.selectedUploadOption = index;
  }

  handleCancel(type: string) {
    this.isModalVisible[type] = false;
    this.selectedUploadOption = 1;
    this.filesForm?.get('files')?.setValue([]);
  }

  showConfirm() {
    this.confirmSwitchModal = this.modal.confirm({
      nzTitle: 'Do you want to switch the branch?',
      nzCentered: true,
      nzContent: 'Switching the branch will result in progress reset',
      nzOnOk: () => {this.switchBranch();},
      nzOnCancel: () => {
        if(this.branchInfo) {
          this.currentBranch = this.branchInfo.current;
        }
      }
    });
  }

  switchBranch() {
    var options: any = {
      'params':{
        'branch': this.currentBranch
      }
    }
    this.message.info('Switching Branch... We will refresh the page once done...');
    this.http.post(`${environment.cbURL}/switch/branch`, null, options).subscribe((response: any) => {
      window.location.reload();
    }, err => {
      
    });
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

    this.http.post(`${environment.cbURL}/upload`, uploadData)
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

  performOperation(operation_type: string) {
    var api = "";
    var object = "";
    
    if (this.showModalType == "event") {
      api = `${environment.cbURL}/reminder/operations`;
      object = "reminder";
    }
    if (this.showModalType == "tracker") {
      api = `${environment.cbURL}/tracker/operations`;
      object = "tracker";
    }
    if (this.showModalType == "link") {
      api = `${environment.cbURL}/platform/operations`;
      object = "platform";
    }

    var params: any = {
      type: operation_type,
    }
    params[object] = JSON.stringify(this.showModalItem);
    var options: any = {
      'headers': null,
      'params': params
    }

    this.http.post(api, null, options).subscribe((response: any) => {
      this.codebase.clearData();
      this.codebase.getData();
      this.hideShowModal();
    }, err => {
      this.hideShowModal();
    });
  }

  convertTimeStringToDate(timeString: string): Date | null {
    if (!timeString) return null;

    const [hours, minutes] = timeString.split(':').map(Number);
    if (isNaN(hours) || isNaN(minutes)) return null;

    const date = new Date();
    date.setHours(hours, minutes, 0, 0);  // hours, minutes, seconds, milliseconds

    return date;
  }

  convertDateStringToDate(dateString: string): Date | null {
    if (!dateString) return null;

    // Parse the date string assuming the format is "YYYY-MM-DD"
    const [year, month, day] = dateString.split('-').map(Number);
    if (isNaN(year) || isNaN(month) || isNaN(day)) return null;

    // Note: Months are 0-based in JavaScript's Date object (January is 0, December is 11)
    return new Date(year, month - 1, day);
  }
}
