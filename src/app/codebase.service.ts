import { Injectable } from '@angular/core';
import { Platform } from './platform';
import { Menu } from './menu';
import { BreadcrumbItem } from './breadcrumb-item';
import { Reminder } from './reminder';
import { Tracker } from './tracker';
import { Company } from './company';
import { Setting } from './setting';
import { Analytics } from './analytics';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CodebaseService {

  runningTheme: string = "dark";
  navMenus: Menu[] = [];
  runningNav: BreadcrumbItem[] = [];
  trackers: Tracker[] = [];
  reminders: Reminder[] = [];
  platforms: Platform[] = [];
  companies: Company[] = [];
  settings: Setting[] = [];
  analytics: Analytics | undefined;

  constructor(private http: HttpClient) {

  }

  initTheme() {
    const theme = this.getConfig(this.runningTheme+"Theme");
    for (const [key, value] of Object.entries(theme)) {
      document.documentElement.style.setProperty(`--${key}`, value);
    }
  }

  switchTheme() {
    this.runningTheme = this.runningTheme === 'dark' ? 'light' : 'dark';
  }

  getConfig(key: string) {
    return this.settings.filter(e => e.key === key)[0];
  }

  getPlatform(url: string | undefined) {
    if(url) {
      const list = this.platforms.filter(item => url.includes(item.name.toLowerCase()) || url.includes(item.url.toLowerCase()));
      return list[0];
    } else {
      return undefined;
    } 
  }

  getType(name: string | undefined) {
    if(name) {
      const list = this.navMenus.filter(item => item.name.toLowerCase() == name);
      return list[0];
    } else {
      return undefined;
    }
  }

  clearData() {
    this.runningTheme = "dark";
    this.navMenus= [];
    this.runningNav = [];
    this.trackers = [];
    this.reminders = [];
    this.platforms = [];
    this.companies = [];
    this.settings= [];
    this.analytics = undefined;
  }

  refreshDatabase() {
    this.http.post(environment.baseURL+"/update", null).subscribe((response: any) => {
      this.clearData();
      window.location.reload();
    },err => {
      
    },() => {

    })
  }

  getData() {
    const http = this.http;
    const codebase = this;

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
