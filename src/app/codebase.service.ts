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
import { environment } from '../environments/environment';
import { Codestate } from './codestate';

@Injectable({
  providedIn: 'root'
})
export class CodebaseService {

  runningTheme: string = "dark";
  navMenus: Menu[] = [];
  statuses: string[] = [];
  levels: string[] = [];
  runningNav: BreadcrumbItem[] = [];
  trackers: Tracker[] = [];
  reminders: Reminder[] = [];
  platforms: Platform[] = [];
  companies: Company[] = [];
  settings: Setting[] = [];
  analytics: Analytics | undefined;

  showStartTimer: boolean = false;
  isDashboardRunning = false;
  minutes: number = 0;
  seconds: number = 0;
  timer: any;
  isPaused: boolean = false;

  constructor(private http: HttpClient) {
    const codestate: Codestate = this.getState('codestate');
    if(codestate?.themePref) {
      this.runningTheme = codestate.themePref;
    }
  }

  initTheme() {
    const theme = JSON.parse(this.getConfig(this.runningTheme+"Theme").config);
    for (const key of Object.keys(theme)) {
      document.documentElement.style.setProperty(`--${key}`, theme[key]);
    }
  }

  switchTheme() {
    this.runningTheme = this.runningTheme === 'dark' ? "light" : "dark";
    var codeState: Codestate = this.getState("codestate");
    if(codeState) {
      codeState.themePref = this.runningTheme;
    } else {
      codeState = {
        themePref: this.runningTheme
      }
    }
    this.saveState("codestate", codeState);
    this.initTheme();
    window.location.reload();
  }

  getConfig(key: string) {
    return this.settings.filter(e => e.name.includes(key))[0];
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

  getStatus(name: string | undefined) {
    if(name) {
      const list = this.statuses.filter(item => item.toLowerCase() == name);
      return list[0];
    } else {
      return undefined;
    }
  }

  getLevel(name: string | undefined) {
    if(name) {
      const list = this.levels.filter(item => item.toLowerCase() == name);
      return list[0];
    } else {
      return undefined;
    }
  }

  getCompany(name: string | undefined) {
    if(name) {
      const list = this.companies.filter(item => item.name.toLowerCase() == name);
      return list[0];
    } else {
      return undefined;
    }
  }

  saveState(storageKey:string, state: any): void {
    localStorage.setItem(storageKey, JSON.stringify(state));
  }

  getState(storageKey: string): any {
    const state = localStorage.getItem(storageKey);
    return state ? JSON.parse(state) : null;
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
    localStorage.removeItem('themePref');
  }

  refreshDatabase() {
    this.http.post(environment.baseURL+"/update", null).subscribe((response: any) => {
      this.clearData();
      window.location.reload();
    },err => {
      
    },() => {

    })
  }

  getColor() {
    if(this.runningTheme === 'dark') {
      return this.getRandomDarkColor();
    } else {
      return this.getRandomLightColor();
    }
  }

  getRandomDarkColor() {
    var red = Math.floor(Math.random() * 128); // Random value between 0 and 127
    var green = Math.floor(Math.random() * 128); // Random value between 0 and 127
    var blue = Math.floor(Math.random() * 128); // Random value between 0 and 127

    // Construct the color string in hexadecimal format
    var color = '#' +
        ('00' + red.toString(16)).slice(-2) +
        ('00' + green.toString(16)).slice(-2) +
        ('00' + blue.toString(16)).slice(-2);

    return color;
  }

  getRandomLightColor() {
    var red = Math.floor(Math.random() * 128) + 128; // Random value between 128 and 255
    var green = Math.floor(Math.random() * 128) + 128; // Random value between 128 and 255
    var blue = Math.floor(Math.random() * 128) + 128; // Random value between 128 and 255

    // Construct the color string in hexadecimal format
    var color = '#' +
        ('00' + red.toString(16)).slice(-2) +
        ('00' + green.toString(16)).slice(-2) +
        ('00' + blue.toString(16)).slice(-2);

    return color;
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

    if(codebase.navMenus.length == 0) {
      http.get(environment.baseURL+"/problem/levels").subscribe((response: any) => {
        codebase.levels = response['problem_levels'];
      },err => {
        
      },() => {
  
      })
    }

    if(codebase.navMenus.length == 0) {
      http.get(environment.baseURL+"/problem/statuses").subscribe((response: any) => {
        codebase.statuses = response['problem_statuses'];
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
        this.initTheme();
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

  startTimer() {
    this.showStartTimer = true;
    this.minutes = 0;
    this.seconds = 0;
    this.timer = setInterval(() => {
      if (!this.isPaused) {
        this.seconds++;
        if (this.seconds === 60) {
          this.seconds = 0;
          this.minutes++;
        }
      }
    }, 1000);
  }

  resumeTimer() {
    this.isPaused = false;
  }

  pauseTimer() {
    this.isPaused = true;
  }

  stopTimer() {
    this.showStartTimer = false;
    this.isPaused = false;
    clearInterval(this.timer);
  }

}
