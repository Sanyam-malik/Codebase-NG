import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CodebaseService } from './codebase.service';
import { environment } from '../environments/environment.development';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  title = 'Codebase';
  year = new Date().getFullYear();


  constructor(private titleService: Title, public codebase: CodebaseService) {
    this.titleService.setTitle(this.title);
  }
  
  ngOnInit(): void {
    this.codebase.getData()
    
  }

}
