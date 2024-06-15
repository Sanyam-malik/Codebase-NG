import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-problem-count',
  templateUrl: './problem-count.component.html',
  styleUrl: './problem-count.component.scss'
})
export class ProblemCountComponent {

  @Input("text") text: string = "";
  @Input("count") count: number = 0;


}
