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
import { Codestate, TableState } from './codestate';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Remark } from './remark';
import { Level } from './level';
import { Status } from './status';
import { BehaviorSubject, Subject } from 'rxjs';
import { Note } from './note';
import { Title } from '@angular/platform-browser';
import { Problem } from './problem';
import { Timeline } from './timeline';
import { Playlist } from './playlist';

@Injectable({
  providedIn: 'root'
})
export class CodebaseService {

  appName = "Codebase";
  appIcon = "../assets/logo.png";
  runningTheme: string = "dark";
  
  types: Menu[] = [];
  statuses: Status[] = [];
  levels: Level[] = [];
  remarks: Remark[] = [];
  trackers: Tracker[] = [];
  reminders: Reminder[] = [];
  platforms: Platform[] = [];
  companies: Company[] = [];
  settings: Setting[] = [];
  problems: Problem[] = [];
  playlists: Playlist[] = [];
  sheets: any[] = [];
  notes: Note[] = [];
  analytics: Analytics | undefined;
  timeline: Timeline | undefined;
  
  triggeredUpdate: boolean = false;
  prevUpdate: any;
  isUpdated$: Subject<Boolean> = new Subject();
  runningNav$: BehaviorSubject<BreadcrumbItem[]> = new BehaviorSubject<BreadcrumbItem[]>([]);

  isTabSwitched: boolean = false;
  timerRunning: boolean = false;
  timerEvents$: Subject<String> = new Subject();
  
  isDashboardRunning = false;
  minutes: number = 0;
  seconds: number = 0;
  timer: any;
  isPaused: boolean = false;

  constructor(private http: HttpClient, private message: NzMessageService, private title: Title) {
    const codestate: Codestate = this.getState('codestate');
    if(codestate?.themePref) {
      this.runningTheme = codestate.themePref;
    }

    document.addEventListener('visibilitychange', () => {
      this.isTabSwitched = document.visibilityState === 'hidden';
    });
    
    setInterval(() => {
      if(!this.triggeredUpdate) {
        this.http.get(environment.baseURL+"/status").subscribe((response: any) => {
          if(response['message'] == 'sys-update') {
            this.message.loading('System is undergoing database update.....');
            this.prevUpdate = true;
          } else {
            if(this.prevUpdate) {
              this.message.success('Database update was successful.....');
              this.isUpdated$.next(true);
              this.prevUpdate = false;
              this.clearData();
              this.getData();
            }
          }
        },err => {
          
        },() => {
    
        })
      }
    }, 5000);
  }

  initTheme() {
    const theme_data = this.getConfig(this.runningTheme+"Theme");
    const name_data = this.getConfig("appName");
    const icon_data = this.getConfig("appIcon");
    
    if(Object.keys(theme_data).length > 0) {
      const theme = JSON.parse(theme_data.config);
      for (const key of Object.keys(theme)) {
        document.documentElement.style.setProperty(`--${key}`, theme[key]);
      }
    }

    if(Object.keys(name_data).length > 0) {
      this.appName = name_data.config;
    }

    if(Object.keys(icon_data).length > 0) {
      this.appIcon = icon_data.config;
    }

    var codeState: Codestate = this.getState("codestate");
    if(codeState) {
      codeState.themePref = this.runningTheme;
      codeState.appName = this.appName;
      codeState.appIcon = this.appIcon;
    } else {
      codeState = {
        themePref: this.runningTheme,
        appName: this.appName,
        appIcon: this.appIcon,
      }
    }
    this.title.setTitle(this.appName);
    this.saveState("codestate", codeState);
  }

  switchTheme() {
    this.runningTheme = this.runningTheme === 'dark' ? "light" : "dark";
    this.initTheme();
    this.isUpdated$.next(true);
  }

  getConfig(key: string) {
    const data: any[] = this.settings.filter(e => e.name.includes(key))
    return data.length > 0 ? data[0] : {};
  }

  getPlatform(url: string | undefined) {
    if(url) {
      const list = this.platforms.filter(item => url.includes(item.name.toLowerCase()) || url.includes(item.url.toLowerCase()));
      return list[0];
    } else {
      return undefined;
    } 
  }

  getType(slug: string | undefined) {
    if(slug) {
      const list = this.types.filter(item => item.slug == slug);
      return list[0];
    } else {
      return undefined;
    }
  }

  getRemark(slug: string | undefined) {
    if(slug) {
      const list = this.remarks.filter(item => item.slug == slug);
      return list[0];
    } else {
      return undefined;
    }
  }

  getStatus(slug: string | undefined) {
    if(slug) {
      const list = this.statuses.filter(item => item.slug == slug);
      return list[0];
    } else {
      return undefined;
    }
  }

  getLevel(slug: string | undefined) {
    if(slug) {
      const list = this.levels.filter(item => item.slug == slug);
      return list[0];
    } else {
      return undefined;
    }
  }

  getCompany(slug: string | undefined) {
    if(slug) {
      const list = this.companies.filter(item => item.slug == slug);
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
    this.types = [];
    this.runningNav$.next([]);
    this.trackers = [];
    this.reminders = [];
    this.platforms = [];
    this.companies = [];
    this.settings = [];
    this.remarks = [];
    this.analytics = undefined;
    this.timeline = undefined;
    localStorage.removeItem('codestate');
    localStorage.removeItem('api_cache');
  }

  refreshDatabase() {
    if(!this.triggeredUpdate) {
      this.triggeredUpdate = true;
      this.message.loading('Sending the datebase update request....')
      this.http.post(environment.baseURL+"/update", null).subscribe((response: any) => {
        if(response['message'] == 'sys-update') {
          this.message.warning('System is already under database update....');
        } else {
          setTimeout(() => {
            this.triggeredUpdate = false;
            this.prevUpdate = true;
          }, 1500);
        }
      },err => {
        
      },() => {

      })
    }
  }

  getColor() {
    if(this.runningTheme === 'dark') {
      return this.getRandomDarkColor();
    } else {
      return this.getRandomLightColor();
    }
  }

  getRandomDarkColor() {
    var red = Math.floor(Math.random() * 128) + 30; // Random value between 0 and 127
    var green = Math.floor(Math.random() * 128) + 30; // Random value between 0 and 127
    var blue = Math.floor(Math.random() * 128) + 30; // Random value between 0 and 127

    // Construct the color string in hexadecimal format
    var color = '#' +
        ('00' + red.toString(16)).slice(-2) +
        ('00' + green.toString(16)).slice(-2) +
        ('00' + blue.toString(16)).slice(-2);

    return color;
  }

  getRandomLightColor() {
    var red = Math.floor(Math.random() * 128) + 98; // Random value between 128 and 255
    var green = Math.floor(Math.random() * 128) + 98; // Random value between 128 and 255
    var blue = Math.floor(Math.random() * 128) + 98; // Random value between 128 and 255

    // Construct the color string in hexadecimal format
    var color = '#' +
        ('00' + red.toString(16)).slice(-2) +
        ('00' + green.toString(16)).slice(-2) +
        ('00' + blue.toString(16)).slice(-2);

    return color;
  }

  getData() {
    // Define an array of endpoints to fetch data
    const endpoints = [
      { property: 'types', url: '/problem/types' },
      { property: 'levels', url: '/problem/levels' },
      { property: 'statuses', url: '/problem/statuses' },
      { property: 'platforms', url: '/platforms' },
      { property: 'trackers', url: '/trackers' },
      { property: 'reminders', url: '/reminders' },
      { property: 'companies', url: '/companies' },
      { property: 'remarks', url: '/remarks' },
      { property: 'notes', url: '/notes' },
      { property: 'settings', url: '/settings' },
      { property: 'analytics', url: '/analytics' },
      { property: 'timeline', url: '/timeline' },
      { property: 'problems', url: '/problems' },
      { property: 'playlists', url: '/playlists' }
    ];
    
    // Fetch data for each endpoint
    endpoints.forEach(endpoint => {
      if (!this.hasOwnProperty(endpoint.property) || !(this as any)[endpoint.property] || (this as any)[endpoint.property].length === 0) {
        this.http.get(environment.baseURL + endpoint.url).subscribe((response: any) => {
          (this as any)[endpoint.property] = response[endpoint.property];
          if (endpoint.property === 'settings') {
            this.initTheme();
          }
        }, err => {
          console.error("Failed to get response from "+endpoint.url+ " endpoint");
        });
      }
    });

  }

  startTimer() {
    this.timerRunning = true;
    this.timerEvents$.next('started');
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
    this.timerEvents$.next('resumed');
  }

  pauseTimer() {
    this.isPaused = true;
    this.timerEvents$.next('paused');
  }

  stopTimer() {
    this.timerRunning = false;
    this.isPaused = false;
    clearInterval(this.timer);
    this.timerEvents$.next('stopped');
  }

  getTableState(tableName: string | undefined | null) {
    if(tableName) {
      const state: Codestate = this.getState("codestate");
      if(state?.tables) {
        return state.tables.filter(e=> e.name.toLowerCase() === tableName.toLowerCase())[0];
      } else {
        return null;
      }
    } return null;
  }

  setTableState(tableName: string | undefined | null, index: number = 1) {
    if(tableName) {
      const state: Codestate = this.getState("codestate");
      var tables: TableState[] | undefined = state?.tables;
      if(state && tables) {
        tables = tables.filter(e=> e.name.toLowerCase() != tableName.toLowerCase());
      } else {
        tables = [];
      }

      tables.push({
        name: tableName,
        index: index
      });

      var codeState: Codestate = {
        "themePref": this.runningTheme,
        "appIcon": this.appIcon,
        "appName": this.appName,
        "tables": tables
      }
      this.saveState("codestate", codeState);
    }
  }

  createSlug(inputString: string) {
    // Convert the string to lowercase and replace spaces with hyphens
    let slug = inputString.toLowerCase().replace(/ /g, '-');
    
    // Remove any characters that are not alphanumeric or hyphens
    slug = slug.replace(/[^a-z0-9\-]/g, '');
    
    // Remove multiple consecutive hyphens
    slug = slug.replace(/\-+/g, '-');
    
    // Remove leading and trailing hyphens
    slug = slug.replace(/^-+|-+$/g, '');
    
    return slug;
  }

}
