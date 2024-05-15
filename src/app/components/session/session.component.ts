import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CodebaseService } from '../../services/codebase.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrl: './session.component.scss'
})
export class SessionComponent implements OnInit, OnDestroy {
  
  url: string | null = '';
  
  constructor(private route: ActivatedRoute, private codebase: CodebaseService, private message: NzMessageService) {}
  
  ngOnDestroy(): void {
    this.message.success('Session Terminated Successfully....');
    this.codebase.stopTimer();
  }

  ngOnInit() {
    this.url = this.route.snapshot.queryParamMap.get('url');
    this.message.success('Session Started Successfully....');
    this.codebase.startTimer();
    
  }

}
