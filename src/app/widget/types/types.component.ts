import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import { CodebaseService } from '../../codebase.service';

export interface PlotData {
  name: string
  y: number,
  color: string,
  sliced: boolean,
  selected: boolean
}

@Component({
  selector: 'app-types',
  templateUrl: './types.component.html',
  styleUrl: './types.component.scss'
})
export class TypesComponent {
  
  get types() {
    if(this.codebase.analytics && this.codebase.analytics.types) {
      return this.codebase.analytics.types;
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
      if(this.types) {
        console.log(this.types);  
        this.loadChart();
        this.isLoaded = true;
        clearTimeout(this.interval);
      }
    }, 1000);
  }

  generatePlots() {
    if (this.types) {
      const countMap = new Map<number, string[]>();
      for (const type of this.types) {
        const count = type.count;
        const name = type.type;

        if (countMap.has(count)) {
          countMap.get(count)?.push(name);
        } else {
          countMap.set(count, [name]);
        }
      }

      // Construct data array
      const data: PlotData[] = [];
      countMap.forEach((names, count) => {
        const name = names.join(', '); // Join names with the same count
        data.push({
            name: name,
            y: count,
            color: this.codebase.getColor(),
            sliced: true,
            selected: false
        });
      });

      return { "data": data };
    } else {
      return {};
    }
  }


  loadChart() {
    const map = this.generatePlots();
    this.chartOptions = {
      chart : {
        margin: [50, 50, 50, 50],
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
        pointFormat: '{series.name}: <b>{point.percentage:.0f}</b>'
      },
      plotOptions : {
        pie: {
          shadow: false,
          center: ['50%', '50%'],
          size:'100%',
          innerSize: '0%',
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
