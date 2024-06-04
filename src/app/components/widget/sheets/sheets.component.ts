import { Component } from '@angular/core';
import { SheetDetail } from '../../../analytics';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { CodebaseService } from '../../../services/codebase.service';

@Component({
  selector: 'app-widget-sheets',
  templateUrl: './sheets.component.html',
  styleUrl: './sheets.component.scss'
})
export class SheetsComponent {
  
  interval: any;
  isLoaded: boolean = false;
  options:string[] = ['In Progress', 'Completed'];
  showRunning: boolean = true;
  sheetIcon: any = faBookOpen;

  constructor(private codebase: CodebaseService) {
    this.codebase.isUpdated$.asObservable().subscribe(res=> {
      this.interval = setTimeout(() => {
        if(this.sheets) {
          this.isLoaded = true;
          clearTimeout(this.interval);
        }
      }, 1000);
    })
  }

  ngOnInit(): void {
    
  }

  handleIndexChange(index: number) {
    this.showRunning = index == 0;
  }

  get sheets() {
    if(this.codebase.analytics && this.codebase.analytics.sheets) {
      return this.codebase.analytics.sheets;
    } else {
      return undefined;
    }
  }

  get data(): SheetDetail[] {
    var result: SheetDetail[] | undefined = this.showRunning ? this.sheets?.['in-progress'] : this.sheets?.completed;
    return result ? result : []
  }
}
