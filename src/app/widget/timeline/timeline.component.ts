import { Component } from '@angular/core';
import { CodebaseService } from '../../codebase.service';

@Component({
  selector: 'app-widget-timeline',
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent {
  
  constructor(private codebase: CodebaseService) {

  }

  isLoaded: boolean = true;
  options:string[] = ['This Month', 'Previous Month', 'Full Timeline'];
  shownTimeline: number = 0;
  
  get timeline():any {
    if(this.codebase.timeline && Object.keys(this.codebase.timeline).length > 0) {
      if(this.shownTimeline == 1) {
        return this.codebase.timeline['previous_timeline'];
      }
      else if(this.shownTimeline == 2) {
        return this.codebase.timeline['full_timeline'];
      } else {
        return this.codebase.timeline['current_timeline'];
      }
    } else {
      return {};
    }
  }

  handleIndexChange($event: number) {
    this.shownTimeline = $event;
  }

  objectEntries(obj: any): any {
    return Object.keys(obj);
  }
  
}
