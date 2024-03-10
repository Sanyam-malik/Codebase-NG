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
import { RemarksComponent } from './remarks/remarks.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    CompaniesComponent,
    LevelsComponent,
    StatusComponent,
    TypesComponent,
    ProblemFocusComponent,
    ProblemCountComponent,
    RemarksComponent
  ],
  imports: [
    CommonModule,
    ZorroModule,
    FontAwesomeModule,
    HighchartsChartModule
  ], 
  exports: [
    CompaniesComponent,
    LevelsComponent,
    RemarksComponent,
    StatusComponent,
    TypesComponent,
    ProblemFocusComponent,
    ProblemCountComponent
  ]
})
export class WidgetModule { }
