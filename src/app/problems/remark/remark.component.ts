import { Component, OnInit } from '@angular/core';
import { Problem } from '../../problem';
import { Router, ActivatedRoute } from '@angular/router';
import { CodebaseService } from '../../codebase.service';

@Component({
  selector: 'app-remark',
  templateUrl: './remark.component.html',
  styleUrl: './remark.component.scss'
})
export class RemarkComponent implements OnInit {
  filter: any | undefined = undefined;
  breadcrumb: any[] = [
    {
      name: 'Remark',
      url: `/problem/remark`
    }
  ];

  data : Problem[] = [];

  get remark(){
    const slug = this.route.snapshot.paramMap.get('remark');
    if(slug) {
      return this.codebase.getRemark(slug);
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
        name: this.remark ? this.remark?.remark : '',
        url: `/problem/remark/${this.remark?.slug}`
      }
    )
    this.filter = {
      key: 'remarks',
      value: this.remark?.remark,
      substringSearch: true
    }
  }
}
