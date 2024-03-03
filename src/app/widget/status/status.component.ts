import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { CodebaseService } from '../../codebase.service';


export interface PlotData {
  y: number,
  color: string,
  events?: any
}

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrl: './status.component.scss'
})

export class StatusComponent implements OnInit {

  get statuses() {
    if(this.codebase.analytics && this.codebase.analytics.statuses) {
      return this.codebase.analytics.statuses;
    } else {
      return undefined;
    }
  }

  Highcharts: typeof Highcharts = Highcharts; // required
  chartOptions: Highcharts.Options = {};
  isLoaded: boolean = false;
  interval: any;

  constructor(private codebase: CodebaseService) {}
  
  ngOnInit(): void {
    this.interval = setTimeout(() => {
      if(this.statuses) {
        this.loadChart();
        this.isLoaded = true;
        clearTimeout(this.interval);
      }
    }, 1000);
  }

  generatePlots() {
    if(this.statuses) {
      var categories: string[] = [];
      var data: PlotData[] = [];

      for(var status of this.statuses) {
        categories.push(status.status);
        data.push({
          y: status.count,
          color: this.codebase.getColor(),
          events: {
            click:(event: any) => {
              const category = event.point.category;
              window.open(`/problem/status/${String(category).toLowerCase()}`, '_self');
            }
          }
        })
      }

      return {
        "categories": categories,
        "data": data
      }
    } else {
      return {};
    }
  }

  loadChart() {
    const map = this.generatePlots();
    this.chartOptions = {
      chart: {
        type: 'bar',
        plotBorderWidth: undefined,
        plotShadow: false,
        backgroundColor: 'transparent',
        borderColor: 'transparent',
      },
      title: {
        text: '',
      },
      xAxis: {
        categories: map['categories'],
        labels: {
          style: {
            fontWeight: 'bold',
            color: 'var(--textPrimaryColor)'
          }
        },
        title: {
          text: null
        },
        gridLineWidth: 1,
        gridLineColor: 'var(--textPrimaryColor)',
        lineWidth: 0
      },
      yAxis: {
        min: 0,
        title: {
          text: ''
        },
        labels: {
          style: {
            fontWeight: 'bold',
            color: 'var(--textPrimaryColor)'
          }
        },
        gridLineWidth: 0
      },
      plotOptions: {
        bar: {
          borderRadius: '50%',
          dataLabels: {
            style: {
              color: 'var(--textPrimaryColor)',
              textOutline: 'none',
            }
          }, 
          groupPadding: 0.1
        }
      },
      legend: {
        enabled: false,
      },
      credits: {
        enabled: false
      },
      series: [
        {
          name: 'Problems',
          type: 'bar',
          data: map['data']
        }
      ]
    };
  }
  
}
