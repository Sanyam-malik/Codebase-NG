import { Component, OnInit } from '@angular/core';
import { CodebaseService } from '../../../services/codebase.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Problem, ProblemBrief } from '../../../data-models/problem';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrl: './all.component.scss'
})
export class AllComponent implements OnInit {

  data: ProblemBrief[] = [];

  constructor(private codebase: CodebaseService, private router: Router, private route: ActivatedRoute) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  
  ngOnInit(): void {
    this.data = this.route.snapshot.data['apiResponse']['problems'];
  }
  
}
