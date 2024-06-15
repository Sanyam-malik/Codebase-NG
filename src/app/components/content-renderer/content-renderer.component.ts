import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowAltCircleLeft, faClipboard, faExpand } from '@fortawesome/free-solid-svg-icons';
import { NzMessageService } from 'ng-zorro-antd/message';
import { MarkdownService } from 'ngx-markdown';
import { CodebaseService } from '../../services/codebase.service';
import { ContentButtons, ContentRenderingService } from '../../services/content-rendering.service';

@Component({
  selector: 'app-content-renderer',
  templateUrl: './content-renderer.component.html',
  styleUrl: './content-renderer.component.scss'
})
export class ContentRendererComponent implements OnInit {

  title: string = '';
  content: string = '';
  type: string = '';
  buttons: ContentButtons[] = [];
  ArrowLIcon: any = faArrowAltCircleLeft;
  FullScreenIcon: any = faExpand;
  Clipboard: any = faClipboard;

  constructor(private route: ActivatedRoute, private message: NzMessageService, private codebase: CodebaseService, private router: Router, private http: HttpClient, private mdService:MarkdownService, private renderService: ContentRenderingService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.codebase.runningNav$.next([]);
  }
  
  ngOnInit(): void {
    this.title = this.renderService.last.title;
    this.content = this.renderService.last.content;
    this.type = this.renderService.last.type;
    if(this.renderService.last.buttons) {
      this.buttons = this.renderService.last.buttons;
    }
    if(!this.title || !this.content) {
      this.prevPage();
    }
  }

  get isLink() {
    return this.content.startsWith('http://') || this.content.startsWith('https://')
  }

  get extension() {
    if(this.isLink) {
      return this.content.substring(this.content.lastIndexOf('.'));
    } else {
      return 'text'
    }
  }

  onCopyToClipboard() {
    this.message.success("Code Copied to Clipboard...");
  }

  prevPage() {
    window.history.back();
  }

}
