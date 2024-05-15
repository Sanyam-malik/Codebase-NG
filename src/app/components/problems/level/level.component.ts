import { Component, OnInit } from '@angular/core';
import { Problem } from '../../../data-models/problem';
import { Router, ActivatedRoute } from '@angular/router';
import { CodebaseService } from '../../../services/codebase.service';

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrl: './level.component.scss'
})
export class LevelComponent implements OnInit {
  filter: any | undefined = undefined;
  breadcrumb: any[] = [
    {
      name: 'Level',
      url: `/problem/level`
    }
  ];

  data : Problem[] = [];

  get level(){
    const slug = this.route.snapshot.paramMap.get('level');
    if(slug) {
      return this.codebase.getLevel(slug);
    } else {
      return undefined;
    }
  }


  constructor(private codebase: CodebaseService, private router: Router, private route: ActivatedRoute) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.data = this.route.snapshot.data['apiResponse']['problems'];
    this.breadcrumb.push(
      {
        name: this.level ? this.level?.level : '',
        url: `/problem/level/${this.level?.slug}`
      }
    )
    this.filter = {
      key: 'level',
      value: this.level?.level
    }
  }
}
