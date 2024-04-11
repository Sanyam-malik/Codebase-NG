import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { CodebaseService } from '../codebase.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { MarkdownService } from 'ngx-markdown';
import { faArrowAltCircleLeft, faArrowAltCircleRight, faExpand } from '@fortawesome/free-solid-svg-icons';
import { NzMessageService } from 'ng-zorro-antd/message';
import { faClipboard } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-note-view',
  templateUrl: './note-view.component.html',
  styleUrl: './note-view.component.scss'
})
export class NoteViewComponent implements OnInit {

  item: Note | undefined;
  page:number = 0;
  ArrowLIcon: any = faArrowAltCircleLeft;
  ArrowRIcon: any = faArrowAltCircleRight;
  FullScreenIcon: any = faExpand;
  Clipboard: any = faClipboard;

  constructor(private route: ActivatedRoute, private message: NzMessageService, private codebase: CodebaseService, private router: Router, private http: HttpClient, private mdService:MarkdownService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.codebase.runningNav = [];
  }

  get note(): string {
    if(this.item) {
      return `${environment.baseURL.replace("/api", "/file")}/${this.item.urls[this.page]}`;
    } else {
      return "";
    }
  }

  get filename(): string {
    if(this.item) {
      const page: string[] = this.item.urls[this.page].split("/");
      return page[page.length-1];
    } else {
      return "";
    }
  }

  get extension(): string {
    if(this.item) {
      return this.item.extensions[this.page];
    } else {
      return "";
    }
  }

  prevPage() {
    if(this.item) {
      this.page = this.page > 0 ? this.page-1 : this.page;
    }
  }

  nextPage() {
    if(this.item) {
      this.page = this.page < this.item.urls.length-1 ? this.page+1 : this.page;
    }
  }

  onCopyToClipboard() {
    this.message.success("Code Copied to Clipboard...");
  }

  ngOnInit() {
    var slug = this.route.snapshot.paramMap.get('id');
    if(slug) {
      var data: Note[] = this.route.snapshot.data['apiResponse']['notes'];
      this.item = data.filter(item => item.slug === slug)[0];
    }
  }
}
