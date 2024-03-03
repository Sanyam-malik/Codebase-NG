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


  constructor(public codebase: CodebaseService) {
    
  }
  
  ngOnInit(): void {
    this.codebase.getData()
    
  }

}
