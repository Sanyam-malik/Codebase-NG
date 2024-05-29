import { Component, OnInit } from '@angular/core';
import { Note } from '../../data-models/note';
import { CodebaseService } from '../../services/codebase.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { MarkdownService } from 'ngx-markdown';
import { faArrowAltCircleLeft, faArrowAltCircleRight, faEdit, faExpand, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NzMessageService } from 'ng-zorro-antd/message';
import { faClipboard } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-note-view',
  templateUrl: './note-view.component.html',
  styleUrl: './note-view.component.scss'
})
export class NoteViewComponent implements OnInit {

  note_head: Note | undefined;
  page:number = 0;
  ArrowLIcon: any = faArrowAltCircleLeft;
  ArrowRIcon: any = faArrowAltCircleRight;
  FullScreenIcon: any = faExpand;
  Clipboard: any = faClipboard;
  editIcon: any = faEdit;
  deleteIcon: any = faTrash;

  constructor(private route: ActivatedRoute, private message: NzMessageService, private codebase: CodebaseService, private router: Router, private http: HttpClient, private mdService:MarkdownService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.codebase.runningNav$.next([]);
  }

  get note(): string {
    if(this.note_head && this.note_head.items.length > 0) {
      return `${environment.cbURL.replace("/api", "/file")}/${this.note_head.items[this.page].url}`;
    } else {
      return "";
    }
  }

  get filename(): string {
    if(this.note_head && this.note_head.items.length > 0) {
      const page: string[] = this.note_head.items[this.page].url.split("/");
      return page[page.length-1];
    } else {
      return "";
    }
  }

  get extension(): string {
    if(this.note_head && this.note_head.items.length > 0) {
      return this.note_head.items[this.page].extension;
    } else {
      return "";
    }
  }

  prevPage() {
    if(this.note_head) {
      this.page = this.page > 0 ? this.page-1 : this.page;
    }
  }

  nextPage() {
    if(this.note_head) {
      const size = this.note_head.items.length - 1;
      this.page = this.page < size ? this.page+1 : this.page;
    }
  }

  onCopyToClipboard() {
    this.message.success("Code Copied to Clipboard...");
  }

  ngOnInit() {
    var uid = this.route.snapshot.paramMap.get('id');
    if(uid) {
      this.note_head  = this.route.snapshot.data['apiResponse']['note'];
      if(this.note_head) {
        this.codebase.setTitle(this.note_head.title);
      }
    }
    
  }

  performOperation(type: string, item: any) {
    var api = `${environment.cbURL}/note/operations`;
    var options: any = {
      'headers': null,
      'params': {
        'type': type,
        'note': JSON.stringify(item)
      }
    }
    this.http.post(api, null, options).subscribe((response: any) => {
      this.codebase.clearData();
      this.codebase.getData();
      this.router.navigate(['/dashboard']);
    }, err => {

    });
  }
}
