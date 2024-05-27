import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Problem } from '../../data-models/problem';
import { CodebaseService } from '../../services/codebase.service';
import { Platform } from '../../data-models/platform';
import { faClipboard, faCode } from '@fortawesome/free-solid-svg-icons';
import { Company } from '../../data-models/company';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { NzMessageService } from 'ng-zorro-antd/message';

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
    Clipboard: any = faClipboard;
    code: string = '';

    constructor(private route: ActivatedRoute, private codebase: CodebaseService, private router: Router, private http: HttpClient, private message: NzMessageService) {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id');
        if(this.id && this.id.length > 0) {
            this.item = this.route.snapshot.data['apiResponse']['problem'];
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
            this.http.get(`${environment.cbURL.replace("/api", "/code")}/${this.item?.filename}`).subscribe((response: any) => {
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

    onCopyToClipboard(text: string) {
        if(!window.navigator || !window.navigator.clipboard) {
            const selBox = document.createElement('textarea');
            selBox.style.position = 'fixed';
            selBox.style.left = '0';
            selBox.style.top = '0';
            selBox.style.opacity = '0';
            selBox.value = text;
            document.body.appendChild(selBox);
            selBox.focus();
            selBox.select();
            document.execCommand('copy');
            document.body.removeChild(selBox);
        } else {
            window.navigator.clipboard.writeText(text);
        }
        this.message.success("Code Copied to Clipboard...");
    }
}
