import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzTableSortOrder, NzTableSortFn, NzTableFilterList, NzTableFilterFn } from 'ng-zorro-antd/table';
import { Problem } from '../problem';
import { CodebaseService } from '../codebase.service';

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

  @Input('data') fullListOfData: Problem[] = [];
  @Input('title') title: string = '';
  @Input('subtitle') subtitle: string = '';
  @Input('state') stateName: string = '';
  
  listOfColumns: ColumnItem[] = [];
  listOfData: Problem[] = [];
  pageIndex: number = 1;
  searchValue: string = '';
  companiesColor:any = {};
  companies: any[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private codebase: CodebaseService) {
    this.listOfData = this.fullListOfData;
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
    
    /* this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    */

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

  search(): void {
    if(this.searchValue.trim().length > 0) {
      this.listOfData = this.fullListOfData.filter((item: Problem) => item.name.toLowerCase().indexOf(this.searchValue.toLowerCase()) !== -1);
    } else {
      this.listOfData = this.fullListOfData;
    }
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

  tagClick(slug: string) {
    this.router.navigate(['/problem/company', slug]);
  }
  
}
