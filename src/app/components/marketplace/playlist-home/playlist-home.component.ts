import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { PlaylistHome } from '../../../data-models/playlist-marketplace';

@Component({
  selector: 'app-playlist-home',
  templateUrl: './playlist-home.component.html',
  styleUrl: './playlist-home.component.scss'
})
export class PlaylistHomeComponent implements OnInit {

  playlists: PlaylistHome[] = [];
  
  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.playlists = this.route.snapshot.data['apiResponse']['playlist'];
  }

  ngOnInit() {
    
  }

}
