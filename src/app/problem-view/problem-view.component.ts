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
    showMore: boolean = false;
    id: string | undefined | null = null;
    item: Problem | undefined;
    button: Platform | undefined;
    codeIcon = faCode;

    constructor(private route: ActivatedRoute, private codebase: CodebaseService, private router: Router) {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

    ngOnInit() {
        
        this.id = this.route.snapshot.paramMap.get('id');
        if(this.id && this.id.length > 0) {
            const data: Problem[] = this.route.snapshot.data['apiResponse']['problems'];
            this.item = data.filter(x=> x.slug == this.id)[0];
            this.button = this.codebase.getPlatform(this.item?.url);
            this.codebase.runningNav$.next([
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
                    url: `/problem/statement/`+this.item?.slug
                }
            ]);
        }
        
    }

    getColor(company: Company) {
        if(this.codebase.runningTheme == 'dark') {
            return company.color_dark;
        } else {
            return company.color_light;
        }
    }

    tagClick(name: string) {
        this.router.navigate(['/problem/company', encodeURIComponent(String(name).toLowerCase())]);
    }
}
