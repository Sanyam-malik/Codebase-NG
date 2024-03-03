import { Component } from '@angular/core';
import { CodebaseService } from '../codebase.service';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'; 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  
  arrowRight: any;
  
  constructor(private codebase: CodebaseService) {
    this.codebase.runningNav = [];

    this.arrowRight = faArrowCircleRight;
  }
}
