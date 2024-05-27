import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaylistViewComponent } from './playlist-view/playlist-view.component';
import { PlaylistHomeComponent } from './playlist-home/playlist-home.component';
import { SheetHomeComponent } from './sheet-home/sheet-home.component';
import { SheetViewComponent } from './sheet-view/sheet-view.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'sheets'
  },
  {
    path: 'playlists',
    component: PlaylistHomeComponent
  },
  {
    path: 'playlist/:id',
    component: PlaylistViewComponent
  },
  {
    path: 'sheets',
    component: SheetHomeComponent
  },
  {
    path: 'sheet/:id',
    component: SheetViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketplaceRoutingModule { }
