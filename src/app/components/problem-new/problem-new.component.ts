import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CodebaseService } from '../../services/codebase.service';
import { Company } from '../../data-models/company';
import { HttpClient } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd/message';
import { LanguageDetectorService } from '../../services/language-detector.service';
import { faClipboard, faCode, faSave } from '@fortawesome/free-solid-svg-icons';
import { ProblemType } from '../../data-models/problem';

@Component({
  selector: 'app-problem-new',
  templateUrl: './problem-new.component.html',
  styleUrl: './problem-new.component.scss'
})
export class ProblemNewComponent implements OnInit {
    
    code = "";
    remarks: string[] = [];
    topics: string[] = [];
    companies: string[] = [];
    status = "In Progress";
    level = 'Easy';
    dir = "";
    subdir = "";
    name = "";
    url = "";
    saveIcon = faSave;
    currentLang = "java";
    codeIcon = faCode;
    description = "";
    notes = ""
    Clipboard: any = faClipboard;
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

    get types():ProblemType[] {
        if(this.dir.length == 0){
            this.dir = this.codebase.types[0]['name'];
        }
        return this.codebase.types;
    }

    constructor(private route: ActivatedRoute, private codebase: CodebaseService, private router: Router, private http: HttpClient, private message: NzMessageService, private langDetect: LanguageDetectorService) {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

    onCodeChange(event: any) {
        this.code = event.innerText;
    }

    onNotesChange(arg0: any) {
        this.notes = arg0.innerText;
    }

    onDescriptionChange(arg0: any) {
        this.description = arg0.innerText;
    }

    commitCode() {
        throw new Error('Method not implemented.');
    }

    createSlug(text: string) {
        return this.codebase.createSlug(text);
    }

    onLangChange() {
        this.code = "";
    }

    removeTopic(removedTag: string) {
        this.topics = this.topics.filter(tag => tag !== removedTag)
    }
    removeCompany(removedTag: string) {
        this.companies = this.companies.filter(tag => tag !== removedTag)
    }
    removeRemark(removedTag: string) {
        this.remarks = this.remarks.filter(tag => tag !== removedTag)
    }

    ngOnInit() {}

    getColor() {
       return this.codebase.getColor();
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
