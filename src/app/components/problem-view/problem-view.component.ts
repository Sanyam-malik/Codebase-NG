import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Problem } from '../../data-models/problem';
import { CodebaseService } from '../../services/codebase.service';
import { Platform } from '../../data-models/platform';
import { faClipboard, faCode, faPlay } from '@fortawesome/free-solid-svg-icons';
import { Company } from '../../data-models/company';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Solution } from '../../data-models/solution';
import { TestCase } from '../../data-models/testcase';

@Component({
  selector: 'app-problem-view',
  templateUrl: './problem-view.component.html',
  styleUrl: './problem-view.component.scss'
})
export class ProblemViewComponent {
    currentLang = "java";
    showMore: boolean = false;
    id: string | undefined | null = null;
    item: Problem | undefined;
    button: Platform | undefined;
    codeIcon = faCode;
    Clipboard: any = faClipboard;
    Play: any = faPlay;
    code: string = '';
    showOutput: boolean = false;
    runAnalysis: any = null;
    outputs: string[] = [
        'Output:',
        '\nPlease Run Code to Continue.........'
    ];
    suggested_code: string = '';
    YTSolutions: Solution[] = [];
    testCases: TestCase[] = [
        {
            id: 1,
            problem_id: "1",
            call_function: "main",
            call_inputs: ["1", "2", "3"],
            call_input_type: "list",
            required_outputs: ["1", "2", "3"],
            required_output_type: "list",
            time_limit: 72.1 
        }
    ]
    languages = [
        {
            name: "Java",
            value: "java",
            icon: "devicon-java-plain"
        },
        {
            name: "Python",
            value: "python",
            icon: "devicon-python-plain"
        },
        {
            name: "C++",
            value: "cpp",
            icon: "devicon-cplusplus-plain"
        },
        {
            name: "Javascript",
            value: "javascript",
            icon: "devicon-javascript-plain"
        },
    ]


    get isDesktop(): boolean {
        return this.codebase.screenSize === 'laptop';
    }

    constructor(private route: ActivatedRoute, private codebase: CodebaseService, private router: Router, private http: HttpClient, private message: NzMessageService) {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

    createSlug(text: string) {
        return this.codebase.createSlug(text);
    }

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id');
        if(this.id && this.id.length > 0) {
            this.item = this.route.snapshot.data['apiResponse']['problem'];
            if(this.item) {
                this.codebase.setTitle(this.item.name);
            }
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
            
            this.getCode();
            this.callYouTube();
            this.callChatGPT();
        }
        
    }

    getCode() {
        this.http.get(`${environment.cbURL.replace("/api", "/code")}/${this.item?.filename}`).subscribe((response: any) => {
            this.code = response['content'];
        });
    }

    getColor(company: Company) {
        if(this.codebase.runningTheme == 'dark') {
            return company.color_dark;
        } else {
            return company.color_light;
        }
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

    callChatGPT() {
        var url = `${environment.intgrnURL}/chatgpt/solution`
        this.http.post(url, this.item).subscribe((response: any)=> {

        },
        error => {
            this.message.error('ChatGPT Service is currently down. Please try again shortly.');
        })
    }

    callYouTube() {
        var url = `${environment.intgrnURL}/youtube/solution`
        this.http.post(url, this.item).subscribe((response: any)=> {
            if(response['message'] == 'success') {
                this.YTSolutions = response['content'];
            }
        },
        error => {
            this.message.error('Youtube Service is currently down. Please try again shortly.');
        })
    }

    runTests() {
        
    }

    runCode() {
        var url = `${environment.intgrnURL}/run/code`
        var body = {
            'language': this.currentLang,
            'code': this.code
        }
        this.http.post(url, body).subscribe((response: any)=> {
            if(response['message'] == 'success') {
                this.outputs.pop();
                if(response['output']) {
                    this.runAnalysis = {
                        time: response['time'],
                        space: response['space']
                    };
                    this.outputs.push(response['output']);
                } else if(response['error']) {
                    this.runAnalysis = null;
                    this.outputs.push(response['error']);
                } else {
                    this.outputs.push('System is unable to run the code');
                }
                this.showOutput = true;
            }
        },
        error => {
            this.outputs.pop();
            this.outputs.push('System is unable to run the code');
            this.showOutput = true;
            this.runAnalysis = null;
        })
    }
}
