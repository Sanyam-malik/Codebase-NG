import { Component, OnInit } from '@angular/core';
import { CodebaseService } from '../../../services/codebase.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Problem, ProblemBrief } from '../../../data-models/problem';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrl: './company.component.scss'
})
export class CompanyComponent implements OnInit {
  filter: any | undefined = undefined;
  breadcrumb: any[] = [
    {
      name: 'Company',
      url: `/problem/company`
    }
  ];

  data : ProblemBrief[] = [];

  get company(){
    const slug = this.route.snapshot.paramMap.get('company');
    if(slug) {
      return this.codebase.getCompany(slug);
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
        name: this.company ? this.company.name : '',
        url: `/problem/company/${this.company?.slug}`
      }
    )
    this.filter = {
      key: 'companies',
      value: this.company?.name,
      subkey: "name",
      datatype: "array",
      substringSearch: true
    }
  }


}
