import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Problem } from '../problem';
import { CodebaseService } from '../codebase.service';
import { Platform } from '../platform';
import { faCode } from '@fortawesome/free-solid-svg-icons';
import { Company } from '../company';

@Component({
  selector: 'app-problem-view',
  templateUrl: './problem-view.component.html',
  styleUrl: './problem-view.component.scss'
})
export class ProblemViewComponent {
    
    id: number | undefined;
    item: Problem | undefined;
    button: Platform | undefined;
    codeIcon = faCode;
    companies: Company[] = [];

    constructor(private route: ActivatedRoute, private codebase: CodebaseService, private router: Router) {}

    ngOnInit() {
        this.id = Number(this.route.snapshot.paramMap.get('id'));
        if(this.id && this.id > 0) {
            const data = this.route.snapshot.data['apiResponse']['problems'];
            this.item = data[this.id - 1];
            this.button = this.codebase.getPlatform(this.item?.url);
            this.codebase.runningNav = [
                {
                    name: 'Home',
                    url: '/dashboard'
                },
                {
                    name: 'Problem',
                    url: '/problems'
                },
                {
                    name: this.item ? this.item.name : "",
                    url: `/problem/view/`+this.item?.name
                }
            ];

            const list = this.item?.companies?.split(",")
            if (list) {
                for(var item of list) {
                   this.companies.push({
                    "name": item,
                    "slug": this.codebase.createSlug(item),
                    "color": this.codebase.getColor()
                   }) 
                }
            }
        }
        
    }

    tagClick(name: string) {
        this.router.navigate(['/problem/company', encodeURIComponent(String(name).toLowerCase())]);
    }
}
