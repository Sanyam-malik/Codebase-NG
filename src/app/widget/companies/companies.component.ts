import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import { CodebaseService } from '../../codebase.service';

export interface PlotData {
  y: number,
  color: string,
  events?: any
}

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrl: './companies.component.scss'
})
export class CompaniesComponent {

  get companies() {
    if(this.codebase.analytics && this.codebase.analytics.companies) {
      return this.codebase.analytics.companies;
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
      if(this.companies) {
        this.loadChart();
        this.isLoaded = true;
        clearTimeout(this.interval);
      }
    }, 1000);
  }

  generatePlots() {
    if(this.companies) {
      var categories: string[] = [];
      var data: PlotData[] = [];

      for(var company of this.companies) {
        categories.push(company.company);
        data.push({
          y: company.count,
          color: this.codebase.getColor(),
          events: {
            click:(event: any) => {
              const category = event.point.category;
              window.open(`/problem/company/${String(category).toLowerCase()}`, '_self');
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
        type: 'column',
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
          type: 'column',
          data: map['data']
        }
      ]
    };
  }

}
