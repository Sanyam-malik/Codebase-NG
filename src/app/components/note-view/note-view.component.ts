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
      return `${environment.baseURL.replace("/api", "/file")}/${this.note_head.items[this.page].url}`;
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
      this.page = this.page < this.note_head.items.length ? this.page+1 : this.page;
    }
  }

  onCopyToClipboard() {
    this.message.success("Code Copied to Clipboard...");
  }

  ngOnInit() {
    var slug = this.route.snapshot.paramMap.get('id');
    if(slug) {
      var data: Note[] = this.route.snapshot.data['apiResponse']['notes'];
      this.note_head = data.filter(item => item.slug === slug)[0];
    }
    
  }
}