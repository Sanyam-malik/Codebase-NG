import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CodebaseService } from '../../../services/codebase.service';
import { Problem } from '../../../data-models/problem';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrl: './status.component.scss'
})
export class StatusComponent implements OnInit {

  filter: any | undefined = undefined;
  breadcrumb: any[] = [
    {
      name: 'Status',
      url: `/problem/status`
    }
  ];

  data : Problem[] = [];

  get status(){
    const slug = this.route.snapshot.paramMap.get('status');
    if(slug) {
      return this.codebase.getStatus(slug);
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
        name: this.status ? this.status?.status : '',
        url: `/problem/status/${this.status?.slug}`
      }
    )
    this.filter = {
      key: 'status',
      value: this.status?.status
    }
  }

}
