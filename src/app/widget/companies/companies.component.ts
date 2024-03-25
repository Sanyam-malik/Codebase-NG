import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import { CodebaseService } from '../../codebase.service';
import { Router } from '@angular/router';

export interface PlotData {
  y: number,
  slug: string,
  color: string,
  category: string,
  events?: any
}

@Component({
  selector: 'app-widget-companies',
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
  minifiedChartOptions: Highcharts.Options = {};
  fullChartOptions: Highcharts.Options = {};
  isLoaded: boolean = false;
  interval: any;
  showMinified: boolean = true;
  options:string[] = ['Top 15 Companies', 'All Companies'];

  constructor(private codebase: CodebaseService, private router: Router) {
    this.codebase.isUpdated$.asObservable().subscribe(res=> {
      this.interval = setTimeout(() => {
        if(this.companies) {
          this.loadChart();
          this.isLoaded = true;
          clearTimeout(this.interval);
        }
      }, 1000);
    })
  }
  
  ngOnInit(): void {
    this.interval = setTimeout(() => {
      if(this.companies) {
        this.loadChart();
        this.isLoaded = true;
        clearTimeout(this.interval);
      }
    }, 1000);
  }

  handleIndexChange(index: number) {
    this.showMinified = index == 0;
  }

  generatePlots() {
    if(this.companies) {
      var categories: string[] = [];
      var data: PlotData[] = [];

      for(var company of this.companies) {
        data.push({
          y: company.count,
          slug: company.slug,
          color: this.codebase.getColor(),
          category: company.company,
          events: {
            click:(event: any) => {
              const category = event.point.category;
              this.router.navigate(['/problem/company', event.point.slug]);
            }
          }
        })
      }

      data.sort((a, b) => a.y > b.y ? -1 : 1);
      for(var item of data) {
        categories.push(item.category);
      }

      return {
        "categories": categories,
        "data": data,
      }
    } else {
      return {};
    }
  }

  loadChart() {
    const fullMap = this.generatePlots();
    var height = fullMap['categories'] && fullMap['categories'].length > 0 ? 40 * fullMap['categories'].length : 400;
    var miniheight = fullMap['categories'] && fullMap['categories'].length > 0 ? 40 * fullMap.data.slice(0, 15).length : 400;

    this.minifiedChartOptions = {
      chart: {
        type: 'bar',
        height: miniheight,
        plotBorderWidth: undefined,
        plotShadow: false,
        backgroundColor: 'transparent',
        borderColor: 'transparent',
      },
      title: {
        text: '',
      },
      xAxis: {
        categories: fullMap['categories'],
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
          data: fullMap['data']?.slice(0, 15)
        }
      ]
    };

    this.fullChartOptions = {
      chart: {
        type: 'bar',
        height: height,
        plotBorderWidth: undefined,
        plotShadow: false,
        backgroundColor: 'transparent',
        borderColor: 'transparent',
      },
      title: {
        text: '',
      },
      xAxis: {
        categories: fullMap['categories'],
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
          data: fullMap['data']
        }
      ]
    };
  }

}
