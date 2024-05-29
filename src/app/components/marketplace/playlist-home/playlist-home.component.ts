import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { PlaylistHome } from '../../../data-models/playlist-marketplace';
import { CodebaseService } from '../../../services/codebase.service';

@Component({
  selector: 'app-playlist-home',
  templateUrl: './playlist-home.component.html',
  styleUrl: './playlist-home.component.scss'
})
export class PlaylistHomeComponent implements OnInit {

  search: string = "";
  playlists: PlaylistHome[] = [];
  pageIndex: number = 1;
  pageSize = 16;
  pageTotal = 0;
  paginatedRecords: PlaylistHome[][] = [];
  
  constructor(private http: HttpClient, private codebase: CodebaseService, private route: ActivatedRoute) {
    this.codebase.setTitle("Playlist MarketPlace");
    this.playlists = this.route.snapshot.data['apiResponse']['playlists'];
  }

  ngOnInit() {
    this.paginatedRecords = this.generateGrids(this.playlists); 
  }

  initSearch() {
    if(this.search) {
      const filteredRecords = this.playlists.filter(item => 
        item.name.toLowerCase().includes(this.search.toLowerCase())
      );
      this.paginatedRecords = this.generateGrids(filteredRecords);
    } else {
      this.paginatedRecords = this.generateGrids(this.playlists); 
    }
    this.pageIndex = 1;
  }

  generateGrids(records: PlaylistHome[]): PlaylistHome[][] {
    this.pageTotal = records.length;
    const startIndex = (this.pageIndex - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    const pageRecords = records.slice(startIndex, endIndex);
    const grids: PlaylistHome[][] = [];

    for (let i = 0; i < pageRecords.length; i += 4) {
      grids.push(pageRecords.slice(i, i + 4));
    }

    return grids;
  }

  pageChange(pageNo: number) {
    this.pageIndex = pageNo;
    this.paginatedRecords = this.generateGrids(this.playlists); 
  }

}
