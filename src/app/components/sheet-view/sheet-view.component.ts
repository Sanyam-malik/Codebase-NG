import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { NzMessageService } from 'ng-zorro-antd/message';
import { MarkdownService } from 'ngx-markdown';
import { environment } from '../../../environments/environment';
import { CodebaseService } from '../../services/codebase.service';
import { ContentRenderingService } from '../../services/content-rendering.service';
import { Sheet } from '../../data-models/sheet';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sheet-view',
  templateUrl: './sheet-view.component.html',
  styleUrl: './sheet-view.component.scss'
})
export class SheetViewComponent implements OnInit {

  uid: string | null = null;
  sheet: Sheet | undefined;
  checkIcon = faCircleCheck;
  deleteIcon:any = faTrash;

  constructor(private route: ActivatedRoute, private message: NzMessageService, private codebase: CodebaseService, private router: Router, private http: HttpClient, private mdService:MarkdownService, private renderService: ContentRenderingService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.codebase.runningNav$.next([]);
  }
  
  ngOnInit(): void {
    this.uid = this.route.snapshot.paramMap.get('id');
    if(this.uid) {
      var data: Sheet[] = this.route.snapshot.data['apiResponse']['sheets'];
      this.sheet = data.filter(item => item.id === this.uid)[0];
    }
  }

  allowChange(item: any) {
    if(item.status == "TODO") {
      this.changeItemStatus('INPROGRESS', item.id);
    }
  }

  changeItemStatus(status: string, itemid: string) {
    var params = {
      status: status,
      item: itemid
    }
    this.http.post(`${environment.baseURL}/sheet/item/status`, {}, {params: params}).subscribe((response: any) => {
      if(status == "COMPLETED") {
        this.message.success("Changes made successfully");
      }
      
      this.getData();
    },err => {
      
    },() => {

    });
  }

  getData() {
    this.http.get(`${environment.baseURL}/sheets`).subscribe((response: any) => {
      if(this.uid) {
        var data: Sheet[] = response['sheets'];
        this.sheet = data.filter(item => item.id === this.uid)[0];
      }
    }, err => {

    });
  }

  addContent(item: any) {
    this.renderService.rendering.push({
      title: item.title,
      content: item.content,
      type: 'sheet',
      element: item
    });
    this.changeItemStatus('INPROGRESS', item.id);
    this.router.navigateByUrl(`/sheet/item/${item.id}`);
  }

}
