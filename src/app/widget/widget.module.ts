import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompaniesComponent } from './companies/companies.component';
import { LevelsComponent } from './levels/levels.component';
import { StatusComponent } from './status/status.component';
import { TypesComponent } from './types/types.component';
import { ProblemFocusComponent } from './problem-focus/problem-focus.component';
import { ProblemCountComponent } from './problem-count/problem-count.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { ZorroModule } from '../zorro/zorro.module';



@NgModule({
  declarations: [
    CompaniesComponent,
    LevelsComponent,
    StatusComponent,
    TypesComponent,
    ProblemFocusComponent,
    ProblemCountComponent
  ],
  imports: [
    CommonModule,
    ZorroModule,
    HighchartsChartModule
  ], 
  exports: [
    CompaniesComponent,
    LevelsComponent,
    StatusComponent,
    TypesComponent,
    ProblemFocusComponent,
    ProblemCountComponent
  ]
})
export class WidgetModule { }
