import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProblemsComponent } from './problems/problems.component';
import { ProblemViewComponent } from './problem-view/problem-view.component';
import { getResolver } from './get.resolver';
import { SessionComponent } from './session/session.component';
import { AllComponent } from './problems/all/all.component';
import { CompanyComponent } from './problems/company/company.component';
import { LevelComponent } from './problems/level/level.component';
import { StatusComponent } from './problems/status/status.component';
import { RemarkComponent } from './problems/remark/remark.component';
import { TypeComponent } from './problems/type/type.component';
import { NoteViewComponent } from './note-view/note-view.component';
import { PlaylistViewComponent } from './playlist-view/playlist-view.component';
import { FocusComponent } from './focus/focus.component';
import { ContentRendererComponent } from './content-renderer/content-renderer.component';
import { SheetViewComponent } from './sheet-view/sheet-view.component';

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
      url: '/problems',
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
      url: '/problems',
      options: {}
    }
  },
  {
    path: 'problem/company/:company',
    component: CompanyComponent,
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
    component: LevelComponent,
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
    component: StatusComponent,
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
    component: RemarkComponent,
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
    path: 'notes/:id',
    component: NoteViewComponent,
    resolve: {
      apiResponse: getResolver
    },
    data: {
      url: '/notes',
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
      url: '/playlists',
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
      url: '/sheets',
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
