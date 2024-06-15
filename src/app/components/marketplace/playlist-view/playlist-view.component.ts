import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { faTrash, faDownload, faUpload } from '@fortawesome/free-solid-svg-icons';
import { NzMessageService } from 'ng-zorro-antd/message';
import { MarkdownService } from 'ngx-markdown';
import { Playlist } from '../../../data-models/playlist';
import { CodebaseService } from '../../../services/codebase.service';
import { ContentRenderingService } from '../../../services/content-rendering.service';
import { PlaylistView } from '../../../data-models/playlist-marketplace';

@Component({
  selector: 'app-playlist-view',
  templateUrl: './playlist-view.component.html',
  styleUrl: './playlist-view.component.scss'
})
export class PlaylistViewComponent {
  uid: string | null = null;
  playlist: PlaylistView | undefined;
  importIcon = faUpload;
  downloadIcon = faDownload;
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

        var temp: any[] = [
          {
            name: 'Home',
            url: '/dashboard'
          },
          {
            name: 'Playlist',
            url: '/playlist'
          },
          {
            name: 'Browse',
            url: '/marketplace/playlists'
          },
          {
            name: this.playlist.title,
            url: '/marketplace/playlist/'+this.playlist.id
          }
        ];
    
        this.codebase.runningNav$.next(temp);

        this.codebase.setTitle(this.playlist.title);
        for (var section of this.playlist.sections) {
          this.pageIndexes[section.id] = 1;
        }
      }
    }
  }

  pageChange(section: any, event: number) {
    this.pageIndexes[section.id]=event;
  }

  importOperation() {
    var api = `${environment.mktURL}/playlist/import/${this.uid}`;
    this.http.get(api).subscribe((response: any) => {
      this.message.success("Playlist Import Successful...")
      this.codebase.clearData();
      this.codebase.getData();
    }, err => {
      
    });
  }

}
