import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { MarkdownService } from 'ngx-markdown';
import { CodebaseService } from '../codebase.service';
import { Playlist } from '../playlist';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-playlist-view',
  templateUrl: './playlist-view.component.html',
  styleUrl: './playlist-view.component.scss'
})
export class PlaylistViewComponent implements OnInit {

  playlist: Playlist | undefined;
  checkIcon = faCircleCheck;
  overallStatus = "TODO";

  constructor(private route: ActivatedRoute, private message: NzMessageService, private codebase: CodebaseService, private router: Router, private http: HttpClient, private mdService:MarkdownService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.codebase.runningNav$.next([]);
  }
  
  ngOnInit(): void {
    var uid = this.route.snapshot.paramMap.get('id');
    if(uid) {
      var data: Playlist[] = this.route.snapshot.data['apiResponse']['playlists'];
      this.playlist = data.filter(item => item.id === uid)[0];
    }

    console.log(this.playlist);
  }


}
