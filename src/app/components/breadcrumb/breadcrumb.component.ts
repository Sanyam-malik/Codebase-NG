import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { BreadcrumbItem } from '../../data-models/breadcrumb-item';
import { CodebaseService } from '../../services/codebase.service';

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
