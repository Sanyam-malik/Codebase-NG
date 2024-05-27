import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { faTrash, faDownload } from '@fortawesome/free-solid-svg-icons';
import { NzMessageService } from 'ng-zorro-antd/message';
import { MarkdownService } from 'ngx-markdown';
import { Playlist } from '../../../data-models/playlist';
import { CodebaseService } from '../../../services/codebase.service';
import { ContentRenderingService } from '../../../services/content-rendering.service';

@Component({
  selector: 'app-playlist-view',
  templateUrl: './playlist-view.component.html',
  styleUrl: './playlist-view.component.scss'
})
export class PlaylistViewComponent {
  uid: string | null = null;
  playlist: Playlist | undefined;
  importIcon = faDownload;
  deleteIcon:any = faTrash;
  pageIndexes: any = {};

  constructor(private route: ActivatedRoute, private message: NzMessageService, private codebase: CodebaseService, private router: Router, private http: HttpClient, private mdService:MarkdownService, private renderService: ContentRenderingService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.codebase.runningNav$.next([]);
  }
  
  ngOnInit(): void {
    this.uid = this.route.snapshot.paramMap.get('id');
    if(this.uid) {
      this.playlist = this.route.snapshot.data['apiResponse']['playlist'];
      if(this.playlist) {
        for (var section of this.playlist.sections) {
          this.pageIndexes[section.id] = 1;
        }
      }
    }
  }

  pageChange(section: any, event: number) {
    this.pageIndexes[section.id]=event;
  }

  getData() {
    this.http.get(`${environment.baseURL}/playlists`).subscribe((response: any) => {
      if(this.uid) {
        var data: Playlist[] = response['playlists'];
        this.playlist = data.filter(item => item.id === this.uid)[0];
      }
    }, err => {

    });
  }


  performOperation(type: string, item: any) {
    var api = `${environment.baseURL}/playlist/operations`;
    var options: any = {
      'headers': null,
      'params': {
        'type': type,
        'playlist': item['id']
      }
    }
    this.http.post(api, null, options).subscribe((response: any) => {
      if(type === 'delete') {
        this.router.navigate(['/dashboard']);
      } else {
        this.getData();
      }
    }, err => {

    });
  }

}
