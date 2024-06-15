import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { MarkdownService } from 'ngx-markdown';
import { CodebaseService } from '../../services/codebase.service';
import { Item, Playlist } from '../../data-models/playlist';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { environment } from '../../../environments/environment';
import { ContentRenderingService } from '../../services/content-rendering.service';
import { faCheck, faRotateRight, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-playlist-view',
  templateUrl: './playlist-view.component.html',
  styleUrl: './playlist-view.component.scss'
})
export class PlaylistViewComponent implements OnInit {

  uid: string | null = null;
  playlist: Playlist | undefined;
  checkIcon = faCircleCheck;
  tickIcon = faCheck;
  deleteIcon:any = faTrash;
  redoIcon = faRotateRight;
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
            name: this.playlist.title,
            url: '/playlist/'+this.playlist.id
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

  allowChange(item: Item) {
    if(item.status == "TODO") {
      this.changeItemStatus('INPROGRESS', item.id);
    }
    window.open(item.url, '__blank');
  }

  calculateColspan(section:any, item: any): number {
    const is_section_completed = section['status'] === 'COMPLETED';
    const is_item_completed = item['status'] === 'COMPLETED'; 
    
    if(is_section_completed) {
      return 1;
    } else {
      const startIndex = (this.pageIndexes[section['id']] - 1) * 10;
      const endIndex = startIndex + 10;
      const records: any[] = section['items'].slice(startIndex, endIndex);
      const completed: any[] = records.filter(record => record.status === 'COMPLETED');

      if(records.length === completed.length) {
        return 1;
      }
      return is_item_completed ? 2 : 1;
    }
  }

  pageChange(section: any, event: number) {
    this.pageIndexes[section.id]=event;
  }

  changeItemStatus(status: string, itemid: string) {
    var params = {
      status: status,
      item: itemid
    }
    this.http.post(`${environment.cbURL}/playlist/item/status`, {}, {params: params}).subscribe((response: any) => {
      if(status == "COMPLETED") {
        this.message.success("Changes made successfully");
      }
      
      this.getData();
    },err => {
      
    },() => {

    });
  }

  getData() {
    this.http.get(`${environment.cbURL}/playlist/${this.uid}`).subscribe((response: any) => {
      if(this.uid) {
        this.playlist = response['playlist'];
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


  performOperation(type: string, item: any) {
    var api = `${environment.cbURL}/playlist/operations`;
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
        this.codebase.clearData();
        this.codebase.getData();
      } else {
        this.getData();
      }
    }, err => {

    });
  }

}
