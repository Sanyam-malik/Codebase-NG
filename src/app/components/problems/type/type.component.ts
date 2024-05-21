import { Component, OnInit } from '@angular/core';
import { Problem, ProblemBrief, ProblemType } from '../../../data-models/problem';
import { Router, ActivatedRoute } from '@angular/router';
import { CodebaseService } from '../../../services/codebase.service';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrl: './type.component.scss'
})
export class TypeComponent implements OnInit {
  type: ProblemType | undefined = undefined;
  filter: any | undefined = undefined;
  breadcrumb: any[] = [
    {
      name: 'Type',
      url: `/problem/type`
    }
  ];

  data : ProblemBrief[] = [];


  constructor(private codebase: CodebaseService, private router: Router, private route: ActivatedRoute) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    const slug = this.route.snapshot.paramMap.get('type');
    if(slug) {
      this.type = this.codebase.getType(slug);
    }
  }

  ngOnInit(): void {
    this.data = this.route.snapshot.data['apiResponse']['problems'];
    this.breadcrumb.push(
      {
        name: this.type ? this.type?.name : '',
        url: `/problem/type/${this.type?.slug}`
      }
    )
    this.filter = {
      key: 'type',
      value: this.type?.name,
      subkey: "name",
      datatype: "object",
      substringSearch: false
    }
  }
}
