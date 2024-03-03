import { Component, Input } from '@angular/core';
import { CodebaseService } from '../../codebase.service';

@Component({
  selector: 'app-problem-focus',
  templateUrl: './problem-focus.component.html',
  styleUrl: './problem-focus.component.scss'
})
export class ProblemFocusComponent {
  @Input("text") text: string = "";
  @Input("focus") focus: string = "";

  constructor(private codebase: CodebaseService) {

  }
}
