import { Component } from '@angular/core';
import { CodebaseService } from '../codebase.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  
  constructor(private codebase: CodebaseService) {
    this.codebase.runningNav = []
  }
}
