import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzTableSortOrder, NzTableSortFn, NzTableFilterList, NzTableFilterFn } from 'ng-zorro-antd/table';
import { Problem } from '../problem';
import { CodebaseService } from '../codebase.service';
import { Company } from '../company';

interface ColumnItem {
  name: string;
  allowSort: boolean
  allowFilter: boolean,
  width: string,
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<Problem> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<Problem> | null;
  filterMultiple: boolean;
  sortDirections: NzTableSortOrder[];
}


@Component({
  selector: 'app-problems',
  templateUrl: './problems.component.html',
  styleUrl: './problems.component.scss'
})
export class ProblemsComponent {

  isTypeFilter: boolean = false;
  isRemarkFilter: boolean = false;
  isCompanyFilter: boolean = false;
  isStatusFilter: boolean = false;
  isLevelFilter: boolean = false;
  listOfData: Problem[] = [];
  listOfColumns: ColumnItem[] = [];
  pageIndex: number = 1;
  companiesColor:any = {};
  companies: any[] = [];

  get type(){
    const type = this.route.snapshot.paramMap.get('type');
    if(type) {
      return this.codebase.getType(type.toLowerCase())?.name;
    } else {
      return undefined
    }
  }

  get company(){
    const company = this.route.snapshot.paramMap.get('company');
    if(company) {
      return this.codebase.getCompany(company.toLowerCase())?.name;
    } else {
      return undefined
    }
  }

  get level(){
    const level = this.route.snapshot.paramMap.get('level');
    if(level) {
      return this.codebase.getLevel(level.toLowerCase());
    } else {
      return undefined
    }
  }

  get status(){
    const status = this.route.snapshot.paramMap.get('status');
    if(status) {
      return this.codebase.getStatus(status.toLowerCase());
    } else {
      return undefined
    }
  }

  get remark(){
    const remark = this.route.snapshot.paramMap.get('remark');
    if(remark) {
      return this.codebase.getRemark(remark.toLowerCase());
    } else {
      return undefined
    }
  }

  constructor(private route: ActivatedRoute, private router: Router, private codebase: CodebaseService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    var data: Problem[] = this.route.snapshot.data['apiResponse']['problems'];
    
    if(String(router.url).includes("/type")) {
      this.isTypeFilter = true;
      const type = this.route.snapshot.paramMap.get('type');
      data = data.filter(e=> e.type && e.type.toLowerCase() == type);
      this.loadState(type);

      this.codebase.runningNav = [
        {
          name: 'Home',
          url: '/dashboard'
        },
        {
          name: 'Problems',
          url: '/problems'
        },
        {
          name: 'Type',
          url: `/problem/types`
        },
        {
          name: this.type ? this.type : '',
          url: `/problem/status/${this.type}`
        }
      ]

    } else if(String(router.url).includes("/company")) {
      this.isCompanyFilter = true;
      const company = this.route.snapshot.paramMap.get('company');
      data = data.filter(e=> e.companies && e.companies.toLowerCase().includes(company ? company : ""));
      this.loadState(company);

      this.codebase.runningNav = [
        {
          name: 'Home',
          url: '/dashboard'
        },
        {
          name: 'Problems',
          url: '/problems'
        },
        {
          name: 'Company',
          url: `/problem/company`
        },
        {
          name: this.company ? this.company : '',
          url: `/problem/company/${this.company}`
        }
      ]

    } else if(String(router.url).includes("/status")) {
      this.isStatusFilter = true;
      const status = this.route.snapshot.paramMap.get('status');
      data = data.filter(e=> e.status && e.status.toLowerCase() == status);
      this.loadState(status);

      this.codebase.runningNav = [
        {
          name: 'Home',
          url: '/dashboard'
        },
        {
          name: 'Problems',
          url: '/problems'
        },
        {
          name: 'Status',
          url: `/problem/statuses}`
        },
        {
          name: this.status ? this.status : '',
          url: `/problem/status/${this.status}`
        }
      ]

    } else if(String(router.url).includes("/level")) {
      this.isLevelFilter = true;
      const level = this.route.snapshot.paramMap.get('level');
      data = data.filter(e=> e.level && e.level.toLowerCase() == level);
      this.loadState(level);

      this.codebase.runningNav = [
        {
          name: 'Home',
          url: '/dashboard'
        },
        {
          name: 'Problems',
          url: '/problems'
        },
        {
          name: 'Level',
          url: `/problem/levels`
        },
        {
          name: this.level ? this.level : '',
          url: `/problem/level/${this.level}`
        }
      ]
    } else if(String(router.url).includes("/remark")) {
      this.isRemarkFilter = true;
      const remark = this.route.snapshot.paramMap.get('remark');
      data = data.filter(e=> e.remarks && remark && e.remarks.toLowerCase().includes(remark));
      this.loadState(remark);

      this.codebase.runningNav = [
        {
          name: 'Home',
          url: '/dashboard'
        },
        {
          name: 'Problems',
          url: '/problems'
        },
        {
          name: 'Remarks',
          url: `/problem/remarks`
        },
        {
          name: this.remark ? this.remark : '',
          url: `/problem/remark/${this.remark}`
        }
      ]
    } else {
      this.loadState("allproblems");
      this.codebase.runningNav = [
        {
          name: 'Home',
          url: '/dashboard'
        },
        {
          name: 'Problems',
          url: '/problems'
        }
      ]
    }
    
    this.listOfData =  data;
    var companies: string[] = [];
    for (var item of data) {
      const list = item.companies?.split(",")
      if (list) {
        for(var listItem of list) {
          companies.push(listItem);
          this.companiesColor[String(listItem)] =this.codebase.getColor(); 
        }
      }
    }

    for(var company of new Set(companies)) {
      this.companies.push({
        text: company,
        value: company
      });
    }
    this.listOfColumns = [
      {
        name: 'Name',
        sortOrder: 'ascend',
        width: '30%',
        allowFilter: false,
        allowSort: true,
        sortFn: (a: Problem, b: Problem) => a.name.localeCompare(b.name),
        sortDirections: ['ascend', 'descend', null],
        filterMultiple: false,
        listOfFilter: [],
        filterFn: null
      },
      {
        name: 'Type',
        sortOrder: null,
        width: '15%',
        allowFilter: true,
        allowSort: true,
        sortFn: (a: Problem, b: Problem) => a.type.localeCompare(b.type),
        sortDirections: ['ascend', 'descend', null],
        filterMultiple: true,
        listOfFilter: [...new Set(this.listOfData.map(problem => problem.type))].map(type => ({ text: type, value: type })) as NzTableFilterList,
        filterFn: (list: string[], item: Problem) => list.some(type => item.type.toLowerCase().indexOf(type.toLowerCase()) !== -1)
      },
      {
        name: 'Level',
        sortOrder: null,
        width: '10%',
        allowFilter: true,
        allowSort: true,
        sortFn: (a: Problem, b: Problem) => a.level.localeCompare(b.level),
        sortDirections: ['ascend', 'descend', null],
        filterMultiple: true,
        listOfFilter: [...new Set(this.listOfData.map(problem => problem.level))].map(level => ({ text: level, value: level })) as NzTableFilterList,
        filterFn: (list: string[], item: Problem) => list.some(level => item.level.toLowerCase().indexOf(level.toLowerCase()) !== -1)
      },
      {
        name: 'Status',
        sortOrder: null,
        width: '15%',
        allowFilter: true,
        allowSort: true,
        sortFn: (a: Problem, b: Problem) => a.status.localeCompare(b.status),
        sortDirections: ['ascend', 'descend', null],
        filterMultiple: true,
        listOfFilter: [...new Set(this.listOfData.map(problem => problem.status))].map(status => ({ text: status, value: status })) as NzTableFilterList,
        filterFn: (list: string[], item: Problem) => list.some(status => item.status.toLowerCase().indexOf(status.toLowerCase()) !== -1)
      },
      {
        name: 'Companies',
        sortOrder: null,
        width: '30%',
        allowFilter: true,
        allowSort: false,
        sortFn: null,
        sortDirections: [],
        filterMultiple: true,
        listOfFilter: this.companies.sort((a, b) => a.text.localeCompare(b.text)),
        filterFn: (list: string[], item: Problem) => list.some(company => item.companies && item.companies.toLowerCase().indexOf(company.toLowerCase()) !== -1)
      }
    ];
  }

  loadState(name: string | undefined | null){
    const tablestate = this.codebase.getTableState(name);
    if(tablestate) {
      this.pageIndex = tablestate.index;
    }
  }

  pageChange(pageNo: number) {
    var name: string | undefined = "allproblems";
    if(this.isCompanyFilter) {
      name = this.company;
    }
    else if(this.isTypeFilter) {
      name = this.type;
    }
    else if(this.isLevelFilter) {
      name = this.level;
    }
    else if(this.isStatusFilter) {
      name = this.status;
    }
    this.codebase.setTableState(name, pageNo);
  }

  tagClick(name: string) {
    window.open(`/problem/company/${String(name).toLowerCase()}`, '_self');
  }
  
}
