import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { MarkdownService } from 'ngx-markdown';
import { CodebaseService } from '../codebase.service';
import { Playlist } from '../playlist';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-playlist-view',
  templateUrl: './playlist-view.component.html',
  styleUrl: './playlist-view.component.scss'
})
export class PlaylistViewComponent implements OnInit {

  uid: string | null = null;
  playlist: Playlist | undefined;
  checkIcon = faCircleCheck;

  constructor(private route: ActivatedRoute, private message: NzMessageService, private codebase: CodebaseService, private router: Router, private http: HttpClient, private mdService:MarkdownService) {
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


}
