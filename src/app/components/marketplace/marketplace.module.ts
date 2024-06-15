import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarketplaceRoutingModule } from './marketplace-routing.module';
import { PlaylistViewComponent } from './playlist-view/playlist-view.component';
import { PlaylistHomeComponent } from './playlist-home/playlist-home.component';
import { SheetHomeComponent } from './sheet-home/sheet-home.component';
import { SheetViewComponent } from './sheet-view/sheet-view.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { NgxNavDrawerModule } from '@ngx-lite/nav-drawer';
import { HighchartsChartModule } from 'highcharts-angular';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { HIGHLIGHT_OPTIONS, HighlightModule } from 'ngx-highlightjs';
import { MarkdownModule } from 'ngx-markdown';
import { NgxUiLoaderModule, NgxUiLoaderRouterModule, NgxUiLoaderHttpModule } from 'ngx-ui-loader';
import { SafePipe } from 'safe-pipe';
import { ZorroModule } from '../../zorro/zorro.module';
import { WidgetModule } from '../widget/widget.module';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';


@NgModule({
  declarations: [
    PlaylistViewComponent,
    PlaylistHomeComponent,
    SheetHomeComponent,
    SheetViewComponent
  ],
  imports: [
    CommonModule,
    SafePipe,
    ZorroModule,
    HighlightModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    WidgetModule,
    HighchartsChartModule,
    NgxNavDrawerModule,
    FileUploadModule,
    MarkdownModule.forRoot({ loader: HttpClient }),
    NgxExtendedPdfViewerModule,
    MarketplaceRoutingModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        fullLibraryLoader: () => import('highlight.js')
      }
    }
  ],
})
export class MarketplaceModule { }
