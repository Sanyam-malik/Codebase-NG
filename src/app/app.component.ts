import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CodebaseService } from './codebase.service';
import { environment } from '../environments/environment.development';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  title = 'codebase-ng';
  year = new Date().getFullYear();


  constructor(private http: HttpClient, public codebase: CodebaseService) {
    
  }
  
  ngOnInit(): void {
    const http = this.http;
    const codebase = this.codebase;

    if(codebase.navMenus.length == 0) {
      http.get(environment.baseURL+"/problem/types").subscribe((response: any) => {
        codebase.navMenus = response['problem_types'].sort((a: any, b: any) => (a['name'] < b['name'] ? -1 : 1));
      },err => {
        
      },() => {
  
      })
    }
  
    if(codebase.platforms.length == 0) {
      http.get(environment.baseURL+"/platforms").subscribe((response: any) => {
        codebase.platforms = response['platforms'];
      },err => {
        
      },() => {
  
      })
    }
  
    if(codebase.trackers.length == 0) {
      http.get(environment.baseURL+"/trackers").subscribe((response: any) => {
        codebase.trackers = response['trackers']
      },err => {
        
      },() => {
  
      })
    }
  
    if(codebase.reminders.length == 0) {
      http.get(environment.baseURL+"/reminders").subscribe((response: any) => {
        codebase.reminders = response['reminders']
      },err => {
        
      },() => {
  
      })
    }
  
    if(codebase.companies.length == 0) {
      http.get(environment.baseURL+"/companies").subscribe((response: any) => {
        codebase.companies = response['companies']
      },err => {
        
      },() => {
  
      })
    }
  
    if(codebase.settings.length == 0) {
      http.get(environment.baseURL+"/settings").subscribe((response: any) => {
        codebase.settings = response['settings']
      },err => {
        
      },() => {
  
      })
    }
  
    if(!codebase.analytics || Object.keys(codebase.analytics).length == 0) {
      http.get(environment.baseURL+"/analytics").subscribe((response: any) => {
        codebase.analytics = response['analytics'];
      },err => {
        
      },() => {
  
      })
    }
    
  }

}
