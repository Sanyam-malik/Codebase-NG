import { Component, OnInit } from '@angular/core';
import { faCircleArrowRight, faList, faStar } from '@fortawesome/free-solid-svg-icons';
import { CodebaseService } from '../../codebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-remarks',
  templateUrl: './remarks.component.html',
  styleUrl: './remarks.component.scss'
})
export class RemarksComponent implements OnInit {
  
  listIcon: any  = faCircleArrowRight;

  constructor(private codebase: CodebaseService, private router: Router) {

  }

  get remarks() {
    return this.codebase.remarks;
  }

  ngOnInit(): void {
    
  }

  redirectToRemarks(remark: string){
    console.log(encodeURIComponent(String(remark).toLowerCase()));
    this.router.navigate(['/problem/remark', encodeURIComponent(String(remark).toLowerCase())]);
  }

}
