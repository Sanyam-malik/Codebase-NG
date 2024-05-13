import { Component, OnInit } from '@angular/core';
import { CodebaseService } from './codebase.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { SPINNER } from 'ngx-ui-loader';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  color: string = '';

  constructor(private codebase: CodebaseService, private router: Router, private themeService: ThemeService) {
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
  }

}
