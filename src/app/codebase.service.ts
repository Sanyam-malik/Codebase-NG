import { Injectable } from '@angular/core';
import { Platform } from './platform';
import { Menu } from './menu';
import { BreadcrumbItem } from './breadcrumb-item';

@Injectable({
  providedIn: 'root'
})
export class CodebaseService {

  navMenus: Menu[] = [];
  runningNav: BreadcrumbItem[] = [];
  trackers: any = [];
  reminders: any = [];
  platforms: Platform[] = [];

  constructor() {

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
