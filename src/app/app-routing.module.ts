import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProblemsComponent } from './components/problems/problems.component';
import { ProblemViewComponent } from './components/problem-view/problem-view.component';
import { getResolver } from './interceptors/get.resolver';
import { SessionComponent } from './components/session/session.component';
import { AllComponent } from './components/problems/all/all.component';
import { CompanyComponent } from './components/problems/company/company.component';
import { LevelComponent } from './components/problems/level/level.component';
import { StatusComponent } from './components/problems/status/status.component';
import { RemarkComponent } from './components/problems/remark/remark.component';
import { TypeComponent } from './components/problems/type/type.component';
import { NoteViewComponent } from './components/note-view/note-view.component';
import { PlaylistViewComponent } from './components/playlist-view/playlist-view.component';
import { FocusComponent } from './components/focus/focus.component';
import { ContentRendererComponent } from './components/content-renderer/content-renderer.component';
import { SheetViewComponent } from './components/sheet-view/sheet-view.component';
import { environment } from '../environments/environment';
import { NotFoundComponent } from './components/not-found/not-found.component';

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
    component: AllComponent,
    resolve: {
      apiResponse: getResolver
    },
    data: {
      url: `${environment.cbURL}/problems`,
      options: {}
    }
  },
  {
    path: 'problem/type/:type',
    component: TypeComponent,
    resolve: {
      apiResponse: getResolver
    },
    data: {
      url: `${environment.cbURL}/problems`,
      options: {
        params: {
          "type": "<<type>>"
        }
      }
    }
  },
  {
    path: 'problem/company/:company',
    component: CompanyComponent,
    resolve: {
      apiResponse: getResolver
    },
    data: {
      url: `${environment.cbURL}/problems`,
      options: {
        params: {
          'company': '<<company>>'
        }
      }
    }
  },
  {
    path: 'problem/level/:level',
    component: LevelComponent,
    resolve: {
      apiResponse: getResolver
    },
    data: {
      url: `${environment.cbURL}/problems`,
      options: {
        params: {
          'level': "<<level>>"
        }
      }
    }
  },
  {
    path: 'problem/status/:status',
    component: StatusComponent,
    resolve: {
      apiResponse: getResolver
    },
    data: {
      url: `${environment.cbURL}/problems`,
      options: {
        params: {
          'status': '<<status>>'
        }
      }
    }
  },
  {
    path: 'problem/remark/:remark',
    component: RemarkComponent,
    resolve: {
      apiResponse: getResolver
    },
    data: {
      url: `${environment.cbURL}/problems`,
      options: {
        params: {
          'remark': '<<remark>>'
        }
      }
    }
  },
  {
    path: 'problem/statement/:id',
    component: ProblemViewComponent,
    resolve: {
      apiResponse: getResolver
    },
    data: {
      url: `${environment.cbURL}/problems`,
      paths: [
        "<<id>>"
      ],
      options: {}
    }
  },
  {
    path: 'notes/:id',
    component: NoteViewComponent,
    resolve: {
      apiResponse: getResolver
    },
    data: {
      url: `${environment.cbURL}/note`,
      paths: [
        "<<id>>"
      ],
      options: {}
    }
  },
  {
    path: 'playlist/:id',
    component: PlaylistViewComponent,
    resolve: {
      apiResponse: getResolver
    },
    data: {
      url: `${environment.cbURL}/playlist`,
      paths: [
        "<<id>>"
      ],
      options: {}
    }
  },
  {
    path: 'sheet/:id',
    component: SheetViewComponent,
    resolve: {
      apiResponse: getResolver
    },
    data: {
      url: `${environment.cbURL}/sheet`,
      paths: [
        "<<id>>"
      ],
      options: {}
    }
  },
  {
    path: 'playlist/item/:id',
    component: ContentRendererComponent 
  },
  {
    path: 'session',
    component: SessionComponent,
  },
  {
    path: 'timer',
    component: FocusComponent,
  },
  {
    path: 'marketplace',
    loadChildren: () => import('./components/marketplace/marketplace.module').then(m => m.MarketplaceModule)
  },
  { 
    path: 'not-found', 
    component: NotFoundComponent
  },
  { 
    path: '**', 
    redirectTo: 'not-found'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
