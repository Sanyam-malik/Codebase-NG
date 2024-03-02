import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzTableSortOrder, NzTableSortFn, NzTableFilterList, NzTableFilterFn } from 'ng-zorro-antd/table';
import { Problem } from '../problem';
import { CodebaseService } from '../codebase.service';

interface ColumnItem {
  name: string;
  allowFilter: boolean
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
  isStatusFilter: boolean = false;
  isLevelFilter: boolean = false;
  listOfData: Problem[] = [];
  listOfColumns: ColumnItem[] = [];

  get type(){
    const type = this.route.snapshot.paramMap.get('type');
    if(type) {
      return this.codebase.getType(type.toLowerCase())?.name;
    } else {
      return undefined
    }
  }

  get level(){
    const level = this.route.snapshot.paramMap.get('level');
    if(level) {
      return level.substring(0, 1).toUpperCase()+level.substring(1).toLowerCase();
    } else {
      return undefined
    }
  }

  get status(){
    const status = this.route.snapshot.paramMap.get('status');
    if(status) {
      return status.substring(0, 1).toUpperCase()+status.substring(1).toLowerCase();
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
      data = data.filter(e=> e.type.toLowerCase() == type);

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

    } else if(String(router.url).includes("/status")) {
      this.isStatusFilter = true;
      const status = this.route.snapshot.paramMap.get('status');
      data = data.filter(e=> e.status.toLowerCase() == status);

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
      data = data.filter(e=> e.level.toLowerCase() == level);

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
    } else {
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
    
    this.listOfColumns = [
      {
        name: 'Name',
        sortOrder: 'ascend',
        allowFilter: false,
        sortFn: (a: Problem, b: Problem) => a.name.localeCompare(b.name),
        sortDirections: ['ascend', 'descend', null],
        filterMultiple: false,
        listOfFilter: [],
        filterFn: null
      },
      {
        name: 'Type',
        sortOrder: null,
        allowFilter: true,
        sortFn: (a: Problem, b: Problem) => a.type.localeCompare(b.type),
        sortDirections: ['ascend', 'descend', null],
        filterMultiple: true,
        listOfFilter: [...new Set(this.listOfData.map(problem => problem.type))].map(type => ({ text: type, value: type })) as NzTableFilterList,
        filterFn: (list: string[], item: Problem) => list.some(type => item.type.toLowerCase().indexOf(type.toLowerCase()) !== -1)
      },
      {
        name: 'Level',
        sortOrder: null,
        allowFilter: true,
        sortFn: (a: Problem, b: Problem) => a.level.localeCompare(b.level),
        sortDirections: ['ascend', 'descend', null],
        filterMultiple: true,
        listOfFilter: [...new Set(this.listOfData.map(problem => problem.level))].map(level => ({ text: level, value: level })) as NzTableFilterList,
        filterFn: (list: string[], item: Problem) => list.some(level => item.level.toLowerCase().indexOf(level.toLowerCase()) !== -1)
      },
      {
        name: 'Status',
        sortOrder: null,
        allowFilter: true,
        sortFn: (a: Problem, b: Problem) => a.status.localeCompare(b.status),
        sortDirections: ['ascend', 'descend', null],
        filterMultiple: true,
        listOfFilter: [...new Set(this.listOfData.map(problem => problem.status))].map(status => ({ text: status, value: status })) as NzTableFilterList,
        filterFn: (list: string[], item: Problem) => list.some(status => item.status.toLowerCase().indexOf(status.toLowerCase()) !== -1)
      }
    ];
  }
  
}
