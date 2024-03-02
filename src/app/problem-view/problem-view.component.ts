import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Problem } from '../problem';
import { CodebaseService } from '../codebase.service';
import { Platform } from '../platform';

@Component({
  selector: 'app-problem-view',
  templateUrl: './problem-view.component.html',
  styleUrl: './problem-view.component.scss'
})
export class ProblemViewComponent {
    
    id: number | undefined;
    item: Problem | undefined;
    button: Platform | undefined;

    constructor(private route: ActivatedRoute, private codebase: CodebaseService) {}

    ngOnInit() {
        this.id = Number(this.route.snapshot.paramMap.get('id'));
        if(this.id && this.id > 0) {
            const data = this.route.snapshot.data['apiResponse']['problems'];
            this.item = data[this.id - 1];
            this.button = this.codebase.getPlatform(this.item?.url);
        }
        
    }
}
