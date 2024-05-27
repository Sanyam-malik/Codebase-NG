import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { NzMessageService } from 'ng-zorro-antd/message';
import { MarkdownService } from 'ngx-markdown';
import { faCode, faDownload, faRotateRight, faTrash, faUpload } from '@fortawesome/free-solid-svg-icons';
import { SheetView } from '../../../data-models/sheet-marketplace';
import { environment } from '../../../../environments/environment';
import { Sheet } from '../../../data-models/sheet';
import { CodebaseService } from '../../../services/codebase.service';
import { ContentRenderingService } from '../../../services/content-rendering.service';

@Component({
  selector: 'app-sheet-view',
  templateUrl: './sheet-view.component.html',
  styleUrl: './sheet-view.component.scss'
})
export class SheetViewComponent implements OnInit {

  uid: string | null = null;
  sheet: SheetView | undefined;
  importIcon = faUpload;
  downloadIcon = faDownload;
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

  getData() {
    this.http.get(`${environment.cbURL}/sheets`).subscribe((response: any) => {
      if(this.uid) {
        var data: Sheet[] = response['sheets'];
        this.sheet = data.filter(item => item.id === this.uid)[0];
      }
    }, err => {

    });
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
      } else {
        this.getData();
      }
    }, err => {

    });
  }

}
