import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Problem } from '../problem';

@Component({
  selector: 'app-problem-view',
  templateUrl: './problem-view.component.html',
  styleUrl: './problem-view.component.scss'
})
export class ProblemViewComponent {
    
    id: number | undefined;
    item: Problem | undefined;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.id = Number(this.route.snapshot.paramMap.get('id'));
        if(this.id && this.id > 0) {
            const data = this.route.snapshot.data['apiResponse']['problems'];
            this.item = data[this.id - 1];
        }
    }
}
