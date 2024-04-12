import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzTableSortOrder, NzTableSortFn, NzTableFilterList, NzTableFilterFn } from 'ng-zorro-antd/table';
import { Problem } from '../problem';
import { CodebaseService } from '../codebase.service';

interface ColumnItem {
  name: string;
  allowSort: boolean
  allowFilter: boolean,
  allowSearch: boolean,
  width: string,
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<Problem> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<Problem> | null;
  filterMultiple: boolean;
  sortDirections: NzTableSortOrder[];
}

interface Filter {
  key: string,
  value: string,
  type?: string,
  substringSearch?: boolean
}


@Component({
  selector: 'app-problems',
  templateUrl: './problems.component.html',
  styleUrl: './problems.component.scss'
})
export class ProblemsComponent implements OnInit{

  @Input('data') fullListOfData: Problem[] = [];
  @Input('title') title: string = '';
  @Input('subtitle') subtitle: string = '';
  @Input('state') stateName: string = '';
  @Input('filter') filter: Filter | undefined;
  @Input('breadcrumb') breadcrumb: any[] = [];
  
  listOfColumns: ColumnItem[] = [];
  listOfData: Problem[] = [];
  pageIndex: number = 1;
  searchValue: string = '';
  visibleMap: any = {
    name: false
  };
  showMore: boolean[] = [];

  companiesColor:any = {};
  companies: any[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private codebase: CodebaseService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    
    if(this.filter) {
      var key = this.filter.key;
      var value = this.filter.value;
      var subStringSearch = this.filter?.substringSearch ? this.filter.substringSearch : false;
      var data : any[] = this.fullListOfData as any[];
      if(this.filter?.type == 'reverse') {
        data = data.filter(e=> {
          if (subStringSearch) {
            return !String(e[key]).toLowerCase().includes(value.toLowerCase());
          } else {
            return String(e[key]).toLowerCase() !== value.toLowerCase();
          }
          
        });
      } else {
        data = data.filter(e=> {
          if (subStringSearch) {
            return String(e[key]).toLowerCase().includes(value.toLowerCase());
          } else {
            return String(e[key]).toLowerCase() === value.toLowerCase();
          }
        });
      }
      this.fullListOfData = data.sort((a, b) => a.name.localeCompare(b.name));
    }

    this.codebase.runningNav = [
      {
        name: 'Home',
        url: '/dashboard'
      },
      {
        name: 'Problems',
        url: '/problems'
      },
    ]
    
    for(var bread of this.breadcrumb) {
      this.codebase.runningNav.push(bread);
    }

    this.listOfData = this.fullListOfData;
    this.showMore.fill(false, 0, this.listOfData.length);
    this.loadState(this.stateName);
    
    var companies: string[] = [];
    for (var item of this.listOfData) {
      const list = item.companies?.split(",")
      if (list) {
        for(var listItem of list) {
          companies.push(listItem);
          this.companiesColor[String(listItem)] =this.codebase.getColor(); 
        }
      }
    }

    for(var comp of new Set(companies)) {
      this.companies.push({
        text: comp,
        value: comp
      });
    }

    this.companies = [{
      text: 'None',
      value: 'none'
    }].concat(this.companies.sort((a, b) => a.text.localeCompare(b.text)))

    this.listOfColumns = [
      {
        name: 'Name',
        sortOrder: 'ascend',
        width: '30%',
        allowFilter: false,
        allowSort: false,
        allowSearch: true,
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
        allowSearch: false,
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
        allowSearch: false,
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
        allowSearch: false,
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
        allowSearch: false,
        sortFn: null,
        sortDirections: [],
        filterMultiple: true,
        listOfFilter: this.companies,
        filterFn: (list: string[], item: Problem) => list.some(company => {
          if(company.toLowerCase() != 'none' && item.companies) {
            return item.companies.toLowerCase().indexOf(company.toLowerCase()) !== -1;
          }
          else {
            return item.companies == null;
          }
        })
      }
    ];
  }

  search(): void {
    if(this.searchValue.trim().length > 0) {
      this.listOfData = this.fullListOfData.filter((item: Problem) => item.name.toLowerCase().indexOf(this.searchValue.toLowerCase()) !== -1);
      this.showMore = [];
      this.showMore.fill(false, 0, this.listOfData.length);
    } else {
      this.listOfData = this.fullListOfData;
      this.showMore = [];
      this.showMore.fill(false, 0, this.listOfData.length);
    }
  }

  reset() {
    this.searchValue = '';
    this.search();
  }

  loadState(name: string | undefined | null){
    const tablestate = this.codebase.getTableState(name);
    if(tablestate) {
      this.pageIndex = tablestate.index;
    }
  }

  pageChange(pageNo: number) {
    this.codebase.setTableState(this.stateName, pageNo);
  }

  tagClick(title: string) {
    this.router.navigate(['/problem/company', this.codebase.createSlug(title)]);
  }
  
}
