import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { BreadcrumbItem } from '../breadcrumb-item';
import { CodebaseService } from '../codebase.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent {

  runningNav: BreadcrumbItem[] = [];
  runningNavSubscription: Subscription | undefined;

  constructor(private codebase: CodebaseService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.codebase.getData();
    this.runningNavSubscription = this.codebase.runningNav$.subscribe((runningNavData: BreadcrumbItem[]) => {
      this.runningNav = runningNavData;
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    if (this.runningNavSubscription) {
      this.runningNavSubscription.unsubscribe();
    }
  }
}
