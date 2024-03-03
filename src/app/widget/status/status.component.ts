import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrl: './status.component.scss'
})

export class StatusComponent {
  Highcharts: typeof Highcharts = Highcharts; // required
  chartOptions: Highcharts.Options = {
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
      categories: ['Africa', 'America', 'Asia', 'Europe'],
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
        name: 'Problems Solved',
        type: 'bar',
        data: [
          {
            y: 23,
            color: 'var(--primaryColor)'
          },
          {
            y: 24,
            color: 'var(--textPrimaryColor)'
          }
        ]
      }
  ]
  };
}
