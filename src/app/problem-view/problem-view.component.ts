import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Problem } from '../problem';
import { CodebaseService } from '../codebase.service';
import { Platform } from '../platform';
import { faCode } from '@fortawesome/free-solid-svg-icons';
import { Company } from '../company';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

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
    code: string = '';

    constructor(private route: ActivatedRoute, private codebase: CodebaseService, private router: Router, private http: HttpClient) {
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
            this.http.get(`${environment.baseURL.replace("/api", "/code")}/${this.item?.filename}`).subscribe((response: any) => {
                this.code = response['content'];
            });
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
