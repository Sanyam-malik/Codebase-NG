import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    this.http.get(`${environment.mktURL}/sheets`).subscribe((response: any) => {
      if(this.uid) {
        var data: Sheet[] = response['sheets'];
        this.sheet = data.filter(item => item.id === this.uid)[0];
      }
    }, err => {

    });
  }

  deleteOperation() {
    const headers = new HttpHeaders();
    headers.append('Accept', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    var title = this.sheet ? this.sheet.title : 'output'; 
    var api = `${environment.mktURL}/sheet/download/${this.uid}`;
    this.http.get(api, {
      headers: headers,
      responseType: 'blob',
    }).subscribe((response: any) => {
        const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${title}.xlsx`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, err => {
      
    });
  }

}
