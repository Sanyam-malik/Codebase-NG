import { Component, OnInit } from '@angular/core';
import { faCircleArrowRight, faList, faStar } from '@fortawesome/free-solid-svg-icons';
import { CodebaseService } from '../../codebase.service';

@Component({
  selector: 'app-remarks',
  templateUrl: './remarks.component.html',
  styleUrl: './remarks.component.scss'
})
export class RemarksComponent implements OnInit {
  
  listIcon: any  = faCircleArrowRight;

  constructor(private codebase: CodebaseService) {

  }

  get remarks() {
    return this.codebase.remarks;
  }

  ngOnInit(): void {
    
  }

  redirectToRemarks(remark: string){
    window.open(`/problem/remark/${String(remark).toLowerCase()}`, '_self');
  }

}
