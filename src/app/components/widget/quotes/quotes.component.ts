import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrl: './quotes.component.scss'
})
export class QuotesComponent implements OnInit {

  quote: string = "";
  author: string = "";

  constructor(private http: HttpClient) {
    
  }
  
  ngOnInit(): void {
    this.http.get(`${environment.cbURL}/quote`).subscribe((response: any) => {
      this.quote = response["content"]
      this.author = response["author"]
    });
  }



}
