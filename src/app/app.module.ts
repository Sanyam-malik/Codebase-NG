import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ZorroModule } from './zorro/zorro.module';
import { ProblemsComponent } from './components/problems/problems.component';
import { ProblemViewComponent } from './components/problem-view/problem-view.component';
import { HIGHLIGHT_OPTIONS, HighlightModule } from 'ngx-highlightjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { WidgetModule } from './components/widget/widget.module';
import { HighchartsChartModule } from 'highcharts-angular';
import { SafePipe } from 'safe-pipe';
import { NgxNavDrawerModule } from '@ngx-lite/nav-drawer';
import { UrlToolPipe } from './pipes/url-tool.pipe';
import { SessionComponent } from './components/session/session.component';
import { AllComponent } from './components/problems/all/all.component';
import { LevelComponent } from './components/problems/level/level.component';
import { TypeComponent } from './components/problems/type/type.component';
import { StatusComponent } from './components/problems/status/status.component';
import { CompanyComponent } from './components/problems/company/company.component';
import { RemarkComponent } from './components/problems/remark/remark.component';
import { NoteViewComponent } from './components/note-view/note-view.component';
import { MarkdownModule } from 'ngx-markdown';
import { PlaylistViewComponent } from './components/playlist-view/playlist-view.component';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ModalComponent } from './components/modal/modal.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { CacheInterceptor } from './interceptors/cache.interceptor';
import { FocusComponent } from './components/focus/focus.component';
import { ContentRendererComponent } from './components/content-renderer/content-renderer.component';
import { SheetViewComponent } from './components/sheet-view/sheet-view.component';
import { NgxUiLoaderConfig, NgxUiLoaderHttpModule, NgxUiLoaderModule, NgxUiLoaderRouterModule, SPINNER } from 'ngx-ui-loader';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ProblemsComponent,
    ProblemViewComponent,
    UrlToolPipe,
    SessionComponent,
    AllComponent,
    LevelComponent,
    TypeComponent,
    StatusComponent,
    CompanyComponent,
    RemarkComponent,
    NoteViewComponent,
    PlaylistViewComponent,
    HeaderComponent,
    FooterComponent,
    ModalComponent,
    BreadcrumbComponent,
    FocusComponent,
    ContentRendererComponent,
    SheetViewComponent
  ],
  imports: [
    SafePipe,
    ZorroModule,
    BrowserModule,
    AppRoutingModule,
    HighlightModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    WidgetModule,
    HighchartsChartModule,
    NgxNavDrawerModule,
    FileUploadModule,
    MarkdownModule.forRoot({ loader: HttpClient }),
    NgxExtendedPdfViewerModule,
    NgxUiLoaderModule,
    NgxUiLoaderRouterModule,
    NgxUiLoaderHttpModule.forRoot({ 
      showForeground: false,
      excludeRegexp: [
        "/api/status"
      ]
    })
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
  bootstrap: [AppComponent]
})
export class AppModule { }
