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
    if(this.codebase.navMenus.length == 0) {
      this.http.get(environment.baseURL+"/problem/types").subscribe((response: any) => {
        this.codebase.navMenus = response['problem_types'].sort((a: any, b: any) => (a['name'] < b['name'] ? -1 : 1));
      },err => {
        
      },() => {

      })
    }

    if(this.codebase.platforms.length == 0) {
      this.http.get(environment.baseURL+"/platforms").subscribe((response: any) => {
        this.codebase.platforms = response['platforms'];
      },err => {
        
      },() => {

      })
    }

    if(this.codebase.trackers.length == 0) {
      this.http.get(environment.baseURL+"/trackers").subscribe((response: any) => {
        this.codebase.trackers = response['trackers']
      },err => {
        
      },() => {

      })
    }

    if(this.codebase.reminders.length == 0) {
      this.http.get(environment.baseURL+"/reminders").subscribe((response: any) => {
        this.codebase.reminders = response['reminders']
      },err => {
        
      },() => {

      })
    }

    if(this.codebase.companies.length == 0) {
      this.http.get(environment.baseURL+"/companies").subscribe((response: any) => {
        this.codebase.companies = response['companies']
      },err => {
        
      },() => {

      })
    }

    if(this.codebase.settings.length == 0) {
      this.http.get(environment.baseURL+"/settings").subscribe((response: any) => {
        this.codebase.settings = response['settings']
      },err => {
        
      },() => {

      })
    }
    
  }

}
