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
import { DashboardComponent } from './dashboard/dashboard.component';
import { ZorroModule } from './zorro/zorro.module';
import { ProblemsComponent } from './problems/problems.component';
import { ProblemViewComponent } from './problem-view/problem-view.component';
import { HIGHLIGHT_OPTIONS, HighlightModule } from 'ngx-highlightjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { WidgetModule } from './widget/widget.module';
import { HighchartsChartModule } from 'highcharts-angular';
import { SafePipe } from 'safe-pipe';
import { NgxNavDrawerModule } from '@ngx-lite/nav-drawer';
import { UrlToolPipe } from './url-tool.pipe';
import { SessionComponent } from './session/session.component';
import { AllComponent } from './problems/all/all.component';
import { LevelComponent } from './problems/level/level.component';
import { TypeComponent } from './problems/type/type.component';
import { StatusComponent } from './problems/status/status.component';
import { CompanyComponent } from './problems/company/company.component';
import { RemarkComponent } from './problems/remark/remark.component';
import { NoteViewComponent } from './note-view/note-view.component';
import { MarkdownModule } from 'ngx-markdown';
import { PlaylistViewComponent } from './playlist-view/playlist-view.component';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ModalComponent } from './modal/modal.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { CacheInterceptor } from './cache.interceptor';

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
    BreadcrumbComponent
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
    NgxExtendedPdfViewerModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true },
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
