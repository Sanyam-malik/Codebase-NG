import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzTableSortOrder, NzTableSortFn, NzTableFilterList, NzTableFilterFn } from 'ng-zorro-antd/table';

interface DataItem {
  date: string,
  description: string,
  filename: string,
  level: string,
  name: string,
  notes: string,
  status: string,
  type: string,
  url: string
}

interface ColumnItem {
  name: string;
  allowFilter: boolean
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<DataItem> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<DataItem> | null;
  filterMultiple: boolean;
  sortDirections: NzTableSortOrder[];
}


@Component({
  selector: 'app-problems',
  templateUrl: './problems.component.html',
  styleUrl: './problems.component.scss'
})
export class ProblemsComponent {

  listOfData: DataItem[] = [];
  listOfColumns: ColumnItem[] = [];

  constructor(private route: ActivatedRoute) {
    const data = this.route.snapshot.data['apiResponse']['problems'];
    this.listOfData =  data as DataItem[];
    this.listOfColumns = [
      {
        name: 'Name',
        sortOrder: 'ascend',
        allowFilter: false,
        sortFn: (a: DataItem, b: DataItem) => a.name.localeCompare(b.name),
        sortDirections: ['ascend', 'descend', null],
        filterMultiple: false,
        listOfFilter: [],
        filterFn: null
      },
      {
        name: 'Type',
        sortOrder: null,
        allowFilter: true,
        sortFn: (a: DataItem, b: DataItem) => a.type.localeCompare(b.type),
        sortDirections: ['ascend', 'descend', null],
        filterMultiple: true,
        listOfFilter: [...new Set(this.listOfData.map(problem => problem.type))].map(type => ({ text: type, value: type })) as NzTableFilterList,
        filterFn: (list: string[], item: DataItem) => list.some(type => item.type.toLowerCase().indexOf(type.toLowerCase()) !== -1)
      },
      {
        name: 'Level',
        sortOrder: null,
        allowFilter: true,
        sortFn: (a: DataItem, b: DataItem) => a.level.localeCompare(b.level),
        sortDirections: ['ascend', 'descend', null],
        filterMultiple: true,
        listOfFilter: [...new Set(this.listOfData.map(problem => problem.level))].map(level => ({ text: level, value: level })) as NzTableFilterList,
        filterFn: (list: string[], item: DataItem) => list.some(level => item.level.toLowerCase().indexOf(level.toLowerCase()) !== -1)
      },
      {
        name: 'Status',
        sortOrder: null,
        allowFilter: true,
        sortFn: (a: DataItem, b: DataItem) => a.status.localeCompare(b.status),
        sortDirections: ['ascend', 'descend', null],
        filterMultiple: true,
        listOfFilter: [...new Set(this.listOfData.map(problem => problem.status))].map(status => ({ text: status, value: status })) as NzTableFilterList,
        filterFn: (list: string[], item: DataItem) => list.some(status => item.status.toLowerCase().indexOf(status.toLowerCase()) !== -1)
      }
    ];
  }
  
}
