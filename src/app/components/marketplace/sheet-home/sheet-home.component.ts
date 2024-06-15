import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SheetHome } from '../../../data-models/sheet-marketplace';
import { CodebaseService } from '../../../services/codebase.service';
import { faBook, faBookOpen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sheet-home',
  templateUrl: './sheet-home.component.html',
  styleUrl: './sheet-home.component.scss'
})
export class SheetHomeComponent implements OnInit {
  
  dataError: boolean = false;
  search: string = "";
  sheets: SheetHome[] = [];
  bookIcon: any = faBookOpen;
  pageIndex: number = 1;
  pageSize = 12;
  pageTotal = 0;
  paginatedRecords: SheetHome[][] = [];
  
  constructor(private http: HttpClient, private codebase: CodebaseService, private route: ActivatedRoute) {
    this.codebase.setTitle("Sheet MarketPlace");
    if(this.route.snapshot.data['apiResponse']) {
      this.sheets = this.route.snapshot.data['apiResponse']['sheets'];
    } else {
      this.dataError = true;
    }
  }

  ngOnInit() {
    this.paginatedRecords = this.generateGrids(this.sheets); 
    var temp: any[] = [
      {
        name: 'Home',
        url: '/dashboard'
      },
      {
        name: 'Sheets',
        url: '/sheets'
      },
      {
        name: 'Browse',
        url: '/marketplace/sheets'
      }
    ];

    this.codebase.runningNav$.next(temp);
  }

  initSearch() {
    if(this.search) {
      const filteredRecords = this.sheets.filter(item => 
        item.name.toLowerCase().includes(this.search.toLowerCase())
      );
      this.paginatedRecords = this.generateGrids(filteredRecords);
    } else {
      this.paginatedRecords = this.generateGrids(this.sheets); 
    }
    this.pageIndex = 1;
  }

  generateGrids(records: SheetHome[]): SheetHome[][] {
    this.pageTotal = records.length;
    const startIndex = (this.pageIndex - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    const pageRecords = records.slice(startIndex, endIndex);
    const grids: SheetHome[][] = [];

    for (let i = 0; i < pageRecords.length; i += 4) {
      grids.push(pageRecords.slice(i, i + 4));
    }

    return grids;
  }

  pageChange(pageNo: number) {
    this.pageIndex = pageNo;
    this.paginatedRecords = this.generateGrids(this.sheets); 
  }
}
