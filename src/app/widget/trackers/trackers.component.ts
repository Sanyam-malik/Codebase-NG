import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CodebaseService } from '../../codebase.service';
import Highcharts from 'highcharts';

@Component({
  selector: 'app-widget-trackers',
  templateUrl: './trackers.component.html',
  styleUrl: './trackers.component.scss'
})
export class TrackersComponent {

  Highcharts: typeof Highcharts = Highcharts; // required
  chartOptions: any = {};
  dataPresent: any = {};
  totalCounts: any = {};

  constructor(private codebase: CodebaseService, private router: Router) {

  }

  getChartOptions(data: any) {
    var chartCategories: any[] = [];
    var chartData: any[] = [];
    var obj = data.counts;

    Object.keys(obj).forEach(item => {
      if(item != 'Total') {
        chartCategories.push(item);
        chartData.push({
          y: obj[item],
          color: "var(--primaryColor)"
        });
      } else {
        const value = obj[item];
        this.dataPresent[data.name] = value > 0 ? true : false;
        this.totalCounts[data.name] = value;
      }
    })

    var chartOptions: Highcharts.Options = {
      chart: {
        type: 'bar',
        height: chartCategories.length*42,
        plotBorderWidth: undefined,
        plotShadow: false,
        backgroundColor: 'transparent',
        borderColor: 'transparent',
      },
      title: {
        text: '',
      },
      xAxis: {
        categories: chartCategories,
        labels: {
          style: {
            fontWeight: 'bold',
            color: 'var(--textPrimaryColor)',
            textOutline: "0px",
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
        stackLabels: {
          enabled: false
        },
        labels: {
          style: {
            fontWeight: 'bold',
            color: 'var(--textPrimaryColor)',
            textOutline: "0px",
          }
        },
        gridLineWidth: 0
      },
      plotOptions: {
        column: {
          stacking: 'normal',
          borderRadius: '20%',
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
          data: chartData
        }
      ]
    };
    return chartOptions;
  }

  get trackers() {
    return this.codebase.analytics?.trackers;
  }

  ngOnInit(): void {
    if(this.trackers) {
      for(var tracker of this.trackers) {
        this.chartOptions[tracker.name] = this.getChartOptions(tracker);
      }
    }
  }
}