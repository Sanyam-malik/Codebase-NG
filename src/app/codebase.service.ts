import { Injectable } from '@angular/core';
import { Platform } from './platform';
import { Menu } from './menu';
import { BreadcrumbItem } from './breadcrumb-item';
import { Reminder } from './reminder';
import { Tracker } from './tracker';
import { Company } from './company';
import { Setting } from './setting';
import { Analytics } from './analytics';

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

  constructor() {

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

}
