import { Component, OnInit } from '@angular/core';
import { CodebaseService } from '../../../services/codebase.service';
import { PlaylistDetail } from '../../../analytics';
import { faVideo } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-widget-playlists',
  templateUrl: './playlists.component.html',
  styleUrl: './playlists.component.scss'
})
export class PlaylistsComponent implements OnInit {

  interval: any;
  isLoaded: boolean = false;
  options:string[] = ['In Progress', 'Completed'];
  showRunning: boolean = true;
  videoIcon: any = faVideo;

  constructor(private codebase: CodebaseService) {
    this.codebase.isUpdated$.asObservable().subscribe(res=> {
      this.interval = setTimeout(() => {
        if(this.playlists) {
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

  get playlists() {
    if(this.codebase.analytics && this.codebase.analytics.playlists) {
      return this.codebase.analytics.playlists;
    } else {
      return undefined;
    }
  }

  get data(): PlaylistDetail[] {
    var result: PlaylistDetail[] | undefined = this.showRunning ? this.playlists?.['in-progress'] : this.playlists?.completed;
    return result ? result : []
  }

}
