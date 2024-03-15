import { Component, OnInit } from '@angular/core';
import { Problem } from '../../problem';
import { Router, ActivatedRoute } from '@angular/router';
import { CodebaseService } from '../../codebase.service';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrl: './type.component.scss'
})
export class TypeComponent implements OnInit {
  filter: any | undefined = undefined;
  breadcrumb: any[] = [
    {
      name: 'Type',
      url: `/problem/type`
    }
  ];

  data : Problem[] = [];

  get type(){
    const slug = this.route.snapshot.paramMap.get('type');
    if(slug) {
      return this.codebase.getType(slug);
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
        name: this.type ? this.type?.name : '',
        url: `/problem/type/${this.type?.slug}`
      }
    )
    this.filter = {
      key: 'type',
      value: this.type?.name
    }
  }
}
