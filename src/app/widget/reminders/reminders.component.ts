import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCalendar, faStar } from '@fortawesome/free-solid-svg-icons';
import { CodebaseService } from '../../codebase.service';

@Component({
  selector: 'app-widget-reminders',
  templateUrl: './reminders.component.html',
  styleUrl: './reminders.component.scss'
})
export class RemindersComponent implements OnInit {
  
  calendarIcon: any = faCalendar;

  constructor(private codebase: CodebaseService, private router: Router) {

  }

  get reminders() {
    return this.codebase.reminders;
  }

  ngOnInit(): void {
    
  }

}
