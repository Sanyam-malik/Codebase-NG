import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompaniesComponent } from './companies/companies.component';
import { LevelsComponent } from './levels/levels.component';
import { StatusComponent } from './status/status.component';
import { TypesComponent } from './types/types.component';
import { ProblemFocusComponent } from './problem-focus/problem-focus.component';
import { ProblemCountComponent } from './problem-count/problem-count.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { ZorroModule } from '../../zorro/zorro.module';
import { RemarksComponent } from './remarks/remarks.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { QuotesComponent } from './quotes/quotes.component';
import { TimelineComponent } from './timeline/timeline.component';
import { RouterModule } from '@angular/router';
import { RelevanceComponent } from './relevance/relevance.component';
import { TrackersComponent } from './trackers/trackers.component';
import { RemindersComponent } from './reminders/reminders.component';
import { SheetsComponent } from './sheets/sheets.component';
import { PlaylistsComponent } from './playlists/playlists.component';

var components = [
  CompaniesComponent,
  LevelsComponent,
  StatusComponent,
  TypesComponent,
  ProblemFocusComponent,
  ProblemCountComponent,
  RemarksComponent,
  QuotesComponent,
  TimelineComponent,
  RelevanceComponent,
  TrackersComponent,
  RemindersComponent,
  SheetsComponent,
  PlaylistsComponent
]

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    ZorroModule,
    FontAwesomeModule,
    RouterModule,
    HighchartsChartModule,
  ], 
  exports: components
})
export class WidgetModule { }
