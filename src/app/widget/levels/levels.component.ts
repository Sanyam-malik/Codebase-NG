import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-levels',
  templateUrl: './levels.component.html',
  styleUrl: './levels.component.scss'
})
export class LevelsComponent {

  Highcharts: typeof Highcharts = Highcharts; // required
  chartOptions: Highcharts.Options = {
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
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
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
        name: 'Browser share',
        data: [
          ['Firefox',   45.0],
          ['IE',       26.8],
          {
              name: 'Chrome',
              y: 12.8,
              sliced: true,
              selected: true
          },
          ['Safari',    8.5],
          ['Opera',     6.2],
          ['Others',      0.7]
        ]
    }]
  };

}
