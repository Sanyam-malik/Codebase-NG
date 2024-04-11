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
import { Subject } from 'rxjs';
import { Note } from './note';

@Injectable({
  providedIn: 'root'
})
export class CodebaseService {

  runningTheme: string = "dark";
  navMenus: Menu[] = [];
  statuses: Status[] = [];
  levels: Level[] = [];
  remarks: Remark[] = [];
  runningNav: BreadcrumbItem[] = [];
  trackers: Tracker[] = [];
  reminders: Reminder[] = [];
  platforms: Platform[] = [];
  companies: Company[] = [];
  settings: Setting[] = [];
  notes: Note[] = [];
  analytics: Analytics | undefined;
  timeline: any = {};
  triggeredUpdate: boolean = false;
  prevUpdate: any;
  isUpdated$: Subject<Boolean> = new Subject();

  isTabSwitched: boolean = false;
  showStartTimer: boolean = false;
  isDashboardRunning = false;
  minutes: number = 0;
  seconds: number = 0;
  timer: any;
  isPaused: boolean = false;

  constructor(private http: HttpClient, private message: NzMessageService) {
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
    const theme = JSON.parse(this.getConfig(this.runningTheme+"Theme").config);
    for (const key of Object.keys(theme)) {
      document.documentElement.style.setProperty(`--${key}`, theme[key]);
    }

    var codeState: Codestate = this.getState("codestate");
    if(codeState) {
      codeState.themePref = this.runningTheme;
    } else {
      codeState = {
        themePref: this.runningTheme,
      }
    }
    this.saveState("codestate", codeState);
  }

  switchTheme() {
    this.runningTheme = this.runningTheme === 'dark' ? "light" : "dark";
    this.initTheme();
    this.isUpdated$.next(true);
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

  getType(slug: string | undefined) {
    if(slug) {
      const list = this.navMenus.filter(item => item.slug == slug);
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
    this.navMenus = [];
    this.runningNav = [];
    this.trackers = [];
    this.reminders = [];
    this.platforms = [];
    this.companies = [];
    this.settings = [];
    this.remarks = [];
    this.analytics = undefined;
    this.timeline = undefined;
    localStorage.removeItem('codestate');
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

    if(codebase.remarks.length == 0) {
      http.get(environment.baseURL+"/remarks").subscribe((response: any) => {
        codebase.remarks = response['remarks']
      },err => {
        
      },() => {
  
      })
    }

    if(codebase.notes.length == 0) {
      http.get(environment.baseURL+"/notes").subscribe((response: any) => {
        codebase.notes = response['notes']
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

    if(!codebase.timeline || Object.keys(codebase.timeline).length == 0) {
      http.get(environment.baseURL+"/timeline").subscribe((response: any) => {
        codebase.timeline['full_timeline'] = response['full_timeline'];
        codebase.timeline['current_timeline'] = response['current_timeline'];
        codebase.timeline['previous_timeline'] = response['previous_timeline'];
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
