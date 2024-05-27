import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaylistViewComponent } from './playlist-view/playlist-view.component';
import { PlaylistHomeComponent } from './playlist-home/playlist-home.component';
import { SheetHomeComponent } from './sheet-home/sheet-home.component';
import { SheetViewComponent } from './sheet-view/sheet-view.component';
import { getResolver } from '../../interceptors/get.resolver';
import { environment } from '../../../environments/environment';

const routes: Routes = [
  {
    path: 'playlists',
    component: PlaylistHomeComponent,
    resolve: {
      apiResponse: getResolver
    },
    data: {
      url: `${environment.mktURL}/playlists`,
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
      url: `${environment.mktURL}/playlist`,
      paths: [
        "<<id>>"
      ],
      options: {}
    }
  },
  {
    path: 'sheets',
    component: SheetHomeComponent,
    resolve: {
      apiResponse: getResolver
    },
    data: {
      url: `${environment.mktURL}/sheets`,
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
      url: `${environment.mktURL}/sheet`,
      paths: [
        "<<id>>"
      ],
      options: {}
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketplaceRoutingModule { }
