import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzTableSortOrder, NzTableSortFn, NzTableFilterList, NzTableFilterFn } from 'ng-zorro-antd/table';
import { Problem } from '../problem';
import { CodebaseService } from '../codebase.service';
import { Company } from '../company';

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
  subkey?: string,
  value: string,
  type?: string,
  datatype?: string,
  substringSearch?: boolean
}


@Component({
  selector: 'app-problems',
  templateUrl: './problems.component.html',
  styleUrl: './problems.component.scss'
})

export class ProblemsComponent implements OnInit {

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

  statuses:any[] = [];
  levels:any[] = [];
  types:any[] = [];
  companies: any[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private codebase: CodebaseService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    var temp: any[] = [
      {
        name: 'Home',
        url: '/dashboard'
      },
      {
        name: 'Problems',
        url: '/problems'
      },
    ];

    for(var bread of this.breadcrumb) {
      temp.push(bread);
    }

    this.codebase.runningNav$.next(temp);
    this.listOfData = this.filterData();
    this.showMore.fill(false, 0, this.listOfData.length);
    this.loadState(this.stateName);
    
    this.statuses = [...new Set(this.listOfData.map(problem => problem.status))].map(status => ({ text: status, value: status }));
    this.levels = [...new Set(this.listOfData.map(problem => problem.level))].map(level => ({ text: level, value: level }))
    this.types = [...new Set(this.listOfData.map(problem => problem.type))].map(type => ({ text: type, value: type }));
    this.companies = [{ text: 'None', value: 'none' }, ...[...new Set(this.listOfData.flatMap(item => item.companies?.map(company => company.name) || []))].map(comp => ({ text: comp, value: comp })).slice(1).sort((a, b) => a.text.localeCompare(b.text))];
    this.setColumns();
  }

  setColumns() {
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
        listOfFilter: this.types as NzTableFilterList,
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
        listOfFilter: this.levels as NzTableFilterList,
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
        listOfFilter: this.statuses as NzTableFilterList,
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
          if(company.toLowerCase().trim() !== 'none') {
            if(item.companies.length > 0) {
              return item.companies.some(c => c.name.includes(company));
            } else {
              return false;
            }
          } else {
            return item.companies.length === 0;
          }
          
        })
      }
    ];
  }

  filterData() {
    var data: any[] = JSON.parse(JSON.stringify(this.fullListOfData));
    if (this.filter) {
      var key = this.filter.key;
      var value = this.filter.value;
      var subStringSearch = this.filter?.substringSearch ? this.filter.substringSearch : false;
      var dataType = this.filter?.datatype ? this.filter.datatype : "string";
      var subKey = this.filter?.subkey ? this.filter.subkey : '';
      if (this.filter?.type == 'reverse') {
        data = data.filter(e => {
          if (dataType === "array" && subKey) {
            const SubCondition: any[] = e[key].filter((item: any) => !String(item[subKey]).toLowerCase().includes(value.toLowerCase()));
            const BaseCondition: any[] = e[key].filter((item: any) => String(item[subKey]).toLowerCase() !== value.toLowerCase());
            if (subStringSearch) {
              return SubCondition.length > 0;
            } else {
              return BaseCondition.length > 0;
            }
          } else {
            if (subStringSearch) {
              return !String(e[key]).toLowerCase().includes(value.toLowerCase());
            } else {
              return String(e[key]).toLowerCase() !== value.toLowerCase();
            }
          }

        });
      } else {
        data = data.filter(e => {
          if (dataType === "array" && subKey) {
            const SubCondition: any[] = e[key].filter((item: any) => String(item[subKey]).toLowerCase().includes(value.toLowerCase()));
            const BaseCondition: any[] = e[key].filter((item: any) => String(item[subKey]).toLowerCase() === value.toLowerCase());
            if (subStringSearch) {
              return SubCondition.length > 0;
            } else {
              return BaseCondition.length > 0;
            }
          } else {
            if (subStringSearch) {
              return String(e[key]).toLowerCase().includes(value.toLowerCase());
            } else {
              return String(e[key]).toLowerCase() === value.toLowerCase();
            }
          }
        });
      }
    }
    return data.sort((a, b) => a.name.localeCompare(b.name));
  }



  search(): void {
    if(this.searchValue.trim().length > 0) {
      this.listOfData = JSON.parse(JSON.stringify(this.fullListOfData.filter((item: Problem) => item.name.toLowerCase().indexOf(this.searchValue.toLowerCase()) !== -1).sort((a, b) => a.name.localeCompare(b.name))));
      this.showMore = [];
      this.showMore.fill(false, 0, this.listOfData.length);
    } else {
      this.listOfData = JSON.parse(JSON.stringify(this.fullListOfData.sort((a, b) => a.name.localeCompare(b.name))));
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

  getCompanyColor(company: Company) {
    if(this.codebase.runningTheme == 'dark') {
        return company.color_dark;
    } else {
        return company.color_light;
    }
  }

  tagClick(title: string) {
    this.router.navigate(['/problem/company', this.codebase.createSlug(title)]);
  }
  
}
