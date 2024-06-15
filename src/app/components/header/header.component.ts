import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { faStopwatch, faPause, faPlay, faStop, faBars, faLink, faCalendar, faBook, faThumbTack, faVideo, faPlus, faTrash, faFileAlt, faCircleHalfStroke, faMoon, faSun, faBookOpen, faEdit, faGlobe, faCodeBranch, faFloppyDisk, faXmark } from '@fortawesome/free-solid-svg-icons';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CodebaseService } from '../../services/codebase.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Branch } from '../../data-models/branch';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Platform } from '../../data-models/platform';
import { Reminder } from '../../data-models/reminder';
import { Tracker } from '../../data-models/tracker';
import { format } from 'date-fns';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  recurrance_types = [
    {
      value: 'MONTHLY',
      text: 'Monthly'
    },
    {
      value: 'WEEKLY',
      text: 'Weekly'
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
  saveIcon: any = faFloppyDisk;
  cancelIcon: any = faXmark;

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
  editableForm!: FormGroup;

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


  constructor(public codebase: CodebaseService, private modal: NzModalService, private fb: FormBuilder,
    private router: Router, private message: NzMessageService, private http: HttpClient) {
    
  }
  
  ngOnInit(): void {
    
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
    this.initForm();
  }

  initForm() {
    if(this.showModalType == 'event') {

      const recurrenceArray = this.showModalItem.recurrence.split(' ');

      this.editableForm = this.fb.group({
        name: [this.showModalItem.name, Validators.required],
        description: [this.showModalItem.description],
        recurrence: [recurrenceArray[0], Validators.required],
        days: [recurrenceArray.length > 1 ? recurrenceArray[1] : 'MONDAY'],
        date: [this.convertDateStringToDate(this.showModalItem.date)],
        startTime: [this.convertTimeStringToDate(this.showModalItem.start_time)],
        endTime: [this.convertTimeStringToDate(this.showModalItem.end_time)]
      });
    }

    if(this.showModalType == 'tracker') {

      var levels = this.levelOptions.map(() => false);
      const levelArray = this.showModalItem.level.split(", ");
      for(var level of levelArray) {
        if(level == 'Easy') {
          levels[0] = true;
        }
        else if(level == 'Medium') {
          levels[1] = true;
        }
        else if(level == 'Hard') {
          levels[2] = true;
        }
      }

      this.editableForm = this.fb.group({
        name: [this.showModalItem.name],
        levels: this.fb.array(levels)
      });
    }

    if(this.showModalType == 'link') {
      this.editableForm = this.fb.group({
        name: [this.showModalItem.name, Validators.required],
        url: [this.showModalItem.url, Validators.required],
        icon: [this.showModalItem.icon, Validators.required]
      });
    }
  }

  get levelFormArray(): FormArray<any> {
    return this.editableForm.get('levels') as FormArray;
  }

  onCheckboxChange(e: any, index: number): void {
    this.levelFormArray.at(index).setValue(e.target.checked);
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
    var objvalue: Platform | Reminder | Tracker | any = JSON.stringify(this.showModalItem);
    
    if (this.showModalType == "event") {
      api = `${environment.cbURL}/reminder/operations`;
      object = "reminder";
      if(operation_type == 'update') {
        var recurrence = this.editableForm.get('recurrence')?.value;
        if(recurrence == 'EVERY') {
          recurrence = recurrence + " "+ this.editableForm.get('days')?.value;
        }
        var temp: any = {
          id: this.showModalItem.id,
          date: this.editableForm.get('date')?.value ? format(this.editableForm.get('date')?.value, 'yyyy-MM-dd') : null,
          description: this.editableForm.get('description')?.value,
          end_time: this.editableForm.get('end_time')?.value ? format(this.editableForm.get('end_time')?.value, 'HH:MM') : null,
          name: this.editableForm.get('name')?.value,
          recurrence: recurrence,
          start_time: this.editableForm.get('start_time')?.value ? format(this.editableForm.get('start_time')?.value, 'HH:MM') : null
        }
        objvalue = temp;
      }
    }
    if (this.showModalType == "tracker") {
      api = `${environment.cbURL}/tracker/operations`;
      object = "tracker";
      if(operation_type == 'update') {
        var levels:string[] = [];
        var tempLevels = this.editableForm.get('levels')?.value;
        if(tempLevels[0] == true) {
          levels.push("Easy");
        }
        if(tempLevels[1] == true) {
          levels.push("Medium");
        }
        if(tempLevels[2] == true) {
          levels.push("Hard");
        }
        var temp: any = {
          id: this.showModalItem.id,
          level: levels.join(", "),
          name: this.editableForm.get('name')?.value,
          slug: this.codebase.createSlug(this.editableForm.get('name')?.value)
        }
        objvalue = temp;
      }
    }
    if (this.showModalType == "link") {
      api = `${environment.cbURL}/platform/operations`;
      object = "platform";
      if(operation_type == 'update') {
        var temp: any = {
          id: this.showModalItem.id,
          name: this.editableForm.get('name')?.value,
          url: this.editableForm.get('url')?.value,
          slug: this.codebase.createSlug(this.editableForm.get('name')?.value),
          icon: this.editableForm.get('icon')?.value
        }
        objvalue = temp;
      }
    }

    var params: any = {
      type: operation_type,
    }
    params[object] = JSON.stringify(objvalue);
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

  submitForm() {
    if(this.editableForm.valid) {
      this.performOperation('update');
    } else {
      this.message.info('Please fill all the required fields.');
    }
  }
}
