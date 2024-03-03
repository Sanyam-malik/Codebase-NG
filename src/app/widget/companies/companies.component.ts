import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrl: './companies.component.scss'
})
export class CompaniesComponent {

  Highcharts: typeof Highcharts = Highcharts; // required
  chartOptions: Highcharts.Options = {
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
      categories: ['Africa', 'America', 'Asia', 'Europe'],
      labels: {
        style: {
          fontWeight: 'bold',
          color: 'var(--textPrimaryColor)'
        }
      },
      title: {
        text: ''
      },
      gridLineWidth: 0,
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
      gridLineWidth: 1
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
        type: 'column',
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
