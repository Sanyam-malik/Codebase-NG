import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { CodebaseService } from '../codebase.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { MarkdownService } from 'ngx-markdown';
import { faArrowAltCircleLeft, faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';

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

  constructor(private route: ActivatedRoute, private codebase: CodebaseService, private router: Router, private http: HttpClient, private mdService:MarkdownService) {
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

  ngOnInit() {
    var slug = this.route.snapshot.paramMap.get('id');
    if(slug) {
      var data: Note[] = this.route.snapshot.data['apiResponse']['notes'];
      this.item = data.filter(item => item.slug === slug)[0];
    }
  }
}
