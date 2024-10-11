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
import { LanguageDetectorService } from '../../services/language-detector.service';

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
    modifiedCode: string = ''
    showOutput: boolean = false;
    runAnalysis: any = null;
    outputs: string[] = [
        'Output:',
        '\nPlease Run Code to Continue.........'
    ];
    suggested_code: string = '';
    YTSolutions: Solution[] = [];
    testCases: TestCase[] | undefined = [];
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

    constructor(private route: ActivatedRoute, private codebase: CodebaseService, private router: Router, private http: HttpClient, private message: NzMessageService, private langDetect: LanguageDetectorService) {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

    onCodeChange(event: any) {
        this.modifiedCode = event.innerText;
    }

    createSlug(text: string) {
        return this.codebase.createSlug(text);
    }

    onLangChange() {
        const detectedLang = this.langDetect.detectLang(this.item?.filename);
        if(detectedLang != this.currentLang) {
            this.code = "";
            this.modifiedCode = "";
        } else {
            this.getCode();
        }
    }

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id');
        if(this.id && this.id.length > 0) {
            this.item = this.route.snapshot.data['apiResponse']['problem'];
            if(this.item) {
                this.codebase.setTitle(this.item.name);
            }
            this.testCases = this.item?.tests;
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
        const detectedLang = this.langDetect.detectLang(this.item?.filename);
        if(detectedLang) {
            this.currentLang = detectedLang;
        }
        this.http.get(`${environment.cbURL.replace("/api", "/code")}/${this.item?.filename}`).subscribe((response: any) => {
            this.code = response['content'];
            this.modifiedCode = this.code;
        });
    }

    showHideOutput() {
        if(this.showOutput) {
            this.code = this.modifiedCode;
        }
        this.showOutput = !this.showOutput;
        
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
        var url = `${environment.crunnerURL}/run/code`
        var body = {
            'language': this.currentLang,
            'code': this.modifiedCode
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
