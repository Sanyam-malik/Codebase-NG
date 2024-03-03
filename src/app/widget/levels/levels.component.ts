import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import { CodebaseService } from '../../codebase.service';

export interface PlotData {
  name: string
  y: number,
  color: string,
  sliced: boolean,
  selected: boolean
  events?: any
}

@Component({
  selector: 'app-levels',
  templateUrl: './levels.component.html',
  styleUrl: './levels.component.scss'
})
export class LevelsComponent {

  get levels() {
    if(this.codebase.analytics && this.codebase.analytics.levels) {
      return this.codebase.analytics.levels;
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
      if(this.levels) {
        this.loadChart();
        this.isLoaded = true;
        clearTimeout(this.interval);
      }
    }, 1000);
  }

  generatePlots() {
    if(this.levels) {
      var data: PlotData[] = [];

      for(var level of this.levels) {
        data.push({
          name: level.level,
          y: level.count,
          color: this.codebase.getColor(),
          sliced: true,
          selected: false,
          events: {
            click:(event: any) => {
              const name = event.point.name;
              window.open(`/problem/level/${String(name).toLowerCase()}`, '_self');
            }
          }
        })
      }
      return {
        "data": data
      }
    } else {
      return {};
    }
  }

  loadChart() {
    const map = this.generatePlots();
    this.chartOptions = {
      chart : {
        plotBorderWidth: undefined,
        plotShadow: false,
        backgroundColor: 'transparent',
        borderColor: 'transparent',
      },
      credits: {
        enabled: false
      },
      title : {
        text: ''   
      },
      tooltip : {
        pointFormat: '{series.name}: <b>{point.y}</b>'
      },
      plotOptions : {
        pie: {
          shadow: false,
          center: ['50%', '50%'],
          size:'100%',
          innerSize: '40%',
          dataLabels: {
            style: {
              color: 'var(--textPrimaryColor)',
              textOutline: 'none',
            }
          }            
        }
      },
      series : [{
        type: 'pie',
        name: 'Problems',
        data: map['data']
      }]
    };
  }

}
