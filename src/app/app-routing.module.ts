import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProblemsComponent } from './problems/problems.component';
import { ProblemViewComponent } from './problem-view/problem-view.component';
import { getResolver } from './get.resolver';
import { SessionComponent } from './session/session.component';

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
    redirectTo: 'problems',
    pathMatch: 'full'
  },
  {
    path: 'problems',
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
    path: 'problem/type/:type',
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
    path: 'problem/company/:company',
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
    path: 'problem/level/:level',
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
    path: 'problem/status/:status',
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
    path: 'problem/remark/:remark',
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
    path: 'problem/statement/:id',
    component: ProblemViewComponent,
    resolve: {
      apiResponse: getResolver
    },
    data: {
      url: '/problems',
      options: {}
    }
  },
  {
    path: 'session',
    component: SessionComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
