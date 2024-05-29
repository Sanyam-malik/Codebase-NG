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
import { faCode, faRotateRight, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sheet-view',
  templateUrl: './sheet-view.component.html',
  styleUrl: './sheet-view.component.scss'
})
export class SheetViewComponent implements OnInit {

  uid: string | null = null;
  sheet: Sheet | undefined;
  checkIcon = faCircleCheck;
  redoIcon = faRotateRight;
  codeIcon = faCode;
  deleteIcon:any = faTrash;
  showDetails: any = {};

  constructor(private route: ActivatedRoute, private message: NzMessageService, private codebase: CodebaseService, private router: Router, private http: HttpClient, private mdService:MarkdownService, private renderService: ContentRenderingService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.codebase.runningNav$.next([]);
  }
  
  ngOnInit(): void {
    this.uid = this.route.snapshot.paramMap.get('id');
    if(this.uid) {
      this.sheet = this.route.snapshot.data['apiResponse']['sheet'];
      if(this.sheet) {
        for(var section of this.sheet.sections) {
          for(var item of section.items) {
            this.showDetails[item.id] = false;
          }
        }
      }
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
    this.http.post(`${environment.cbURL}/sheet/item/status`, {}, {params: params}).subscribe((response: any) => {
      if(status == "COMPLETED") {
        this.message.success("Changes made successfully");
      }
      
      this.getData();
    },err => {
      
    },() => {

    });
  }

  getData() {
    this.http.get(`${environment.cbURL}/sheet/${this.uid}`).subscribe((response: any) => {
      if(this.uid) {
        this.sheet = response['sheet'];
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

  performOperation(type: string, item: any) {
    var api = `${environment.cbURL}/sheet/operations`;
    var options: any = {
      'headers': null,
      'params': {
        'type': type,
        'sheet': item['id']
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
