import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CodebaseService {

  navMenus: any[] = [];
  logo: string = "";
  runningNav: any[] = [];

  constructor() {

  }
}
