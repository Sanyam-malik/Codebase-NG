import { Component } from '@angular/core';
import { CodebaseService } from '../../codebase.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Problem } from '../../problem';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrl: './all.component.scss'
})
export class AllComponent {

  data : Problem[] = [];

  constructor(private codebase: CodebaseService, private router: Router, private route: ActivatedRoute) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.data = this.route.snapshot.data['apiResponse']['problems'];
    console.log(this.data);
  }
}
