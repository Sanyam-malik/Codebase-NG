import { Injectable } from '@angular/core';
import { Platform } from './platform';

@Injectable({
  providedIn: 'root'
})
export class CodebaseService {

  navMenus: any[] = [];
  logo: string = "";
  runningNav: any[] = [];
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

}
