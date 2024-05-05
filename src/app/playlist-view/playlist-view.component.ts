import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { MarkdownService } from 'ngx-markdown';
import { CodebaseService } from '../codebase.service';
import { Playlist } from '../playlist';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { environment } from '../../environments/environment';
import { ContentRenderingService } from '../content-rendering.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-playlist-view',
  templateUrl: './playlist-view.component.html',
  styleUrl: './playlist-view.component.scss'
})
export class PlaylistViewComponent implements OnInit {

  uid: string | null = null;
  playlist: Playlist | undefined;
  checkIcon = faCircleCheck;
  deleteIcon:any = faTrash;

  constructor(private route: ActivatedRoute, private message: NzMessageService, private codebase: CodebaseService, private router: Router, private http: HttpClient, private mdService:MarkdownService, private renderService: ContentRenderingService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.codebase.runningNav$.next([]);
  }
  
  ngOnInit(): void {
    this.uid = this.route.snapshot.paramMap.get('id');
    if(this.uid) {
      var data: Playlist[] = this.route.snapshot.data['apiResponse']['playlists'];
      this.playlist = data.filter(item => item.id === this.uid)[0];
    }
  }

  changeItemStatus(status: string, itemid: string) {
    var params = {
      status: status,
      item: itemid
    }
    this.http.post(`${environment.baseURL}/playlists/item/status`, {}, {params: params}).subscribe((response: any) => {
      this.getData();
    },err => {
      
    },() => {

    });
  }

  getData() {
    this.http.get(`${environment.baseURL}/playlists`).subscribe((response: any) => {
      if(this.uid) {
        var data: Playlist[] = response['playlists'];
        this.playlist = data.filter(item => item.id === this.uid)[0];
        console.log(this.playlist);
      }
    }, err => {

    });
  }

  addContent(item: any) {
    this.renderService.rendering.push({
      title: item.title,
      content: item.content,
      type: 'playlist',
      element: item
    });
    this.changeItemStatus('INPROGRESS', item.id);
    this.router.navigateByUrl(`/playlist/item/${item.id}`);
  }

}
