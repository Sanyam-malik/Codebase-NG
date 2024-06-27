import { Component, OnInit } from '@angular/core';
import { CodebaseService } from './services/codebase.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { SPINNER } from 'ngx-ui-loader';
import { ThemeService } from './services/theme.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  color: string = '';

  constructor(private codebase: CodebaseService, private breakpointObserver: BreakpointObserver, private router: Router, private themeService: ThemeService) {
    this.codebase.getData();
    setTimeout(() => {
      this.color = this.themeService.getPrimaryColor();
    }, 100);
  }

  get SPINNER() {
    return SPINNER;
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd)
    ).subscribe(() => {
      window.scrollTo(0, 0);
    });

    this.breakpointObserver.observe([
      Breakpoints.Small,
      Breakpoints.HandsetPortrait,
      Breakpoints.HandsetLandscape
    ]).subscribe(result => {
      this.codebase.screenSize = result.matches ? 'mobile': 'laptop';
    });
  }

}
