import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProblemsComponent } from './problems/problems.component';
import { ProblemViewComponent } from './problem-view/problem-view.component';
import { getResolver } from './get.resolver';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'problem',
    component: ProblemsComponent,
    resolve: {
      apiResponse: getResolver
    },
    data: {
      url: '/problems',
      options: {}
    }
  },
  {
    path: 'problem/:id',
    component: ProblemViewComponent,
    resolve: {
      apiResponse: getResolver
    },
    data: {
      url: '/problems',
      options: {}
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
