import { Component, OnInit } from '@angular/core';
import { CodebaseService } from '../../../services/codebase.service';
import { Router } from '@angular/router';
import { faFile, faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-widget-relevance',
  templateUrl: './relevance.component.html',
  styleUrl: './relevance.component.scss'
})
export class RelevanceComponent implements OnInit {
  
  listIcon: any  = faStar;

  constructor(private codebase: CodebaseService, private router: Router) {

  }

  get relevance() {
    return this.codebase.analytics?.relevance;
  }

  ngOnInit(): void {
    
  }
}
