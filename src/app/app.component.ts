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
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  constructor(public codebase: CodebaseService) {}
  
  ngOnInit(): void {
    this.codebase.getData();
  }

}
