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

  constructor(private http: HttpClient, public codebase: CodebaseService) {
    
  }
  
  ngOnInit(): void {
    if(this.codebase.navMenus.length == 0) {
      this.http.get(environment.baseURL+"/problem/types").subscribe((response: any) => {
        console.log(response['problem_types']);
        this.codebase.navMenus = response['problem_types'].sort((a: any, b: any) => (a['name'] < b['name'] ? -1 : 1));
      },err => {
        
      },() => {

      })
    }
  }
  
  title = 'codebase-ng';
  year = new Date().getFullYear();



}
