import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { CodebaseService } from '../codebase.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { MarkdownService } from 'ngx-markdown';

@Component({
  selector: 'app-note-view',
  templateUrl: './note-view.component.html',
  styleUrl: './note-view.component.scss'
})
export class NoteViewComponent implements OnInit {
  item: Note | undefined;
  note: string = '';

  constructor(private route: ActivatedRoute, private codebase: CodebaseService, private router: Router, private http: HttpClient, private mdService:MarkdownService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.codebase.runningNav = [];
  }

  ngOnInit() {
    var slug = this.route.snapshot.paramMap.get('id');
    if(slug) {
      var data: Note[] = this.route.snapshot.data['apiResponse']['notes'];
      this.item = data.filter(item => item.slug === slug)[0];
      this.note = `${environment.baseURL.replace("/api", "/file")}/${this.item.url}`;
    }
  }
}
