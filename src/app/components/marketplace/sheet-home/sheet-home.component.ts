import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SheetHome } from '../../../data-models/sheet-marketplace';
import { CodebaseService } from '../../../services/codebase.service';

@Component({
  selector: 'app-sheet-home',
  templateUrl: './sheet-home.component.html',
  styleUrl: './sheet-home.component.scss'
})
export class SheetHomeComponent implements OnInit {
  
  search: string = "";
  sheets: SheetHome[] = [];
  pageIndex: number = 1;
  pageSize = 16;
  pageTotal = 0;
  paginatedRecords: SheetHome[][] = [];
  
  constructor(private http: HttpClient, private codebase: CodebaseService, private route: ActivatedRoute) {
    this.codebase.setTitle("Sheet MarketPlace");
    this.sheets = this.route.snapshot.data['apiResponse']['sheets'];
  }

  ngOnInit() {
    this.paginatedRecords = this.generateGrids(this.sheets); 
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
