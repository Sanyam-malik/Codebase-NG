import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CodebaseService } from '../../../services/codebase.service';
import Highcharts from 'highcharts';
import { TrackerAnalytic, TrackerItemAnalytic } from '../../../analytics';

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

  getChartOptions(data: TrackerAnalytic) {
    var chartCategories: any[] = [];
    var chartData: any[] = [];
    var items: TrackerItemAnalytic[] = data.counts;

    for(var item of items) {
      if(item.name === 'Total') {
        this.totalCounts[data.name] = item.count;
      } else {
        chartCategories.push(item.name);
        chartData.push({
          y: item.count,
          color: "var(--primaryColor)"
        });
      }
    }

    this.dataPresent[data.name] = data.counts.length > 0 ? true : false;
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
            fontWeight: 'normal',
            fontFamily: 'Lato',
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
            fontWeight: 'normal',
            fontFamily: 'Lato',
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
              fontFamily: 'Lato',
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
