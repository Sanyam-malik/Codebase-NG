import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { SheetHome } from '../../../data-models/sheet-marketplace';

@Component({
  selector: 'app-sheet-home',
  templateUrl: './sheet-home.component.html',
  styleUrl: './sheet-home.component.scss'
})
export class SheetHomeComponent implements OnInit {

  sheets: SheetHome[] = [];
  
  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.sheets = this.route.snapshot.data['apiResponse']['sheet'];
  }

  ngOnInit() {
    
  }
}
