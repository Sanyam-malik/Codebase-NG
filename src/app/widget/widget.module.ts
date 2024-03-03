import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompaniesComponent } from './companies/companies.component';
import { LevelsComponent } from './levels/levels.component';
import { StatusComponent } from './status/status.component';
import { TypesComponent } from './types/types.component';
import { ProblemFocusComponent } from './problem-focus/problem-focus.component';
import { ProblemCountComponent } from './problem-count/problem-count.component';



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
    CommonModule
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
