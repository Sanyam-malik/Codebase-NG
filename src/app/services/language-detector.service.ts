import { Injectable, OnInit } from "@angular/core";
import { CodebaseService } from "./codebase.service";

export interface RunnerExtensions {
    py: string,
    js: string,
    java: string,
    cpp: string
}

@Injectable({
    providedIn: 'root'
})
export class LanguageDetectorService implements OnInit {
  
    extensions: RunnerExtensions = {
        py: 'python',
        js: 'javascript',
        java: 'java',
        cpp: 'cpp'
    }
    
    constructor(){}
  
    ngOnInit(): void {
      
    }

    detectLang(file: string | undefined): string | null {
        if(!file) {
            return null;
        }

        const fileArray: string[] = file.split(".");
        const ext: string = fileArray[fileArray.length - 1];

        // Use a type guard to check if the key exists
        if (ext in this.extensions) {
            return this.extensions[ext as keyof RunnerExtensions]; // safe type cast
        }

        return null;
    }


}