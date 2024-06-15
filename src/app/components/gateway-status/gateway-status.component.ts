import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-gateway-status',
  templateUrl: './gateway-status.component.html',
  styleUrl: './gateway-status.component.scss'
})
export class GatewayStatusComponent implements OnInit, OnDestroy{

  information: any | undefined;
  healthIcon = faCircle;
  systemData: any = {};
  intervalId: any;
  
  constructor(private http: HttpClient) {
    this.intervalId = setInterval(() => {
      this.getData();
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
  
  ngOnInit(): void {
    
  }

  getData() {
    this.http.get(`${environment.gwURL}/status`).subscribe((response: any) => {
      this.information = response;
      this.systemData['Datacenter'] = this.information['name'];
      this.systemData['Environment'] = String(window.location.origin).includes('localhost') ? 'Development' : 'Production';
    });
  }

}
