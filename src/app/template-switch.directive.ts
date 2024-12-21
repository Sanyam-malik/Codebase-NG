import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {filter} from 'rxjs/operators';

@Directive({
  selector: '[switch]'
})
export class TemplateSwitchDirective {
  currentRoute:string = "";
  Default: any;
  Empty: any;

  @Input()
  set DefaultTemplate(DefaultTemplate: TemplateRef<any>){
    this.Default = DefaultTemplate;
  }

  @Input()
  set EmptyTemplate(EmptyTemplate: TemplateRef<any>){
    this.Empty = EmptyTemplate;
  }

  constructor(private router: Router, private viewContainer: ViewContainerRef){
    router.events.pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe(event => {
          this.currentRoute = event.urlAfterRedirects;
          this.viewContainer.clear();
          if(this.currentRoute.includes('/home')) {
            this.viewContainer.createEmbeddedView(this.Default);
          }
          else if(this.currentRoute.includes('/datacenter') || this.currentRoute.includes('/timer')) {
            this.viewContainer.createEmbeddedView(this.Empty);
          } else {
            this.viewContainer.createEmbeddedView(this.Default);
          }
      });
  }

}
