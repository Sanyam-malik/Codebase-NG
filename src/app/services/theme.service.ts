import { Injectable, OnInit } from '@angular/core';
import { CodebaseService } from './codebase.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService implements OnInit {

  constructor(private codebase: CodebaseService){

  }

  ngOnInit(): void {
    
  }

  get theme(){
    const theme_data = this.codebase.getConfig(this.codebase.runningTheme+"Theme");
    if(Object.keys(theme_data).length > 0) {
      return JSON.parse(theme_data.config);
    }
    return {
      primaryColor: "",
      secondaryColor: "",
      headerColor: "",
      backgroundColor: "",
      alternativeTableColor: "",
      textPrimaryColor: "",
      textSecondaryColor: "",
      boxColor: "",
      boxShadow: "",
      paginationDisabledBGColor: "",
      paginationActiveBGColor: "",
      paginationBGColor: "",
      paginationTXTColor: ""
    };
  }

  getTheme(): any {
    return this.theme;
  }

  getPrimaryColor(): string {
    return this.theme.primaryColor;
  }

  getSecondaryColor(): string {
    return this.theme.secondaryColor;
  }

  getHeaderColor(): string {
    return this.theme.headerColor;
  }

  getBackgroundColor(): string {
    return this.theme.backgroundColor;
  }

  getAlternativeTableColor(): string {
    return this.theme.alternativeTableColor;
  }

  getTextPrimaryColor(): string {
    return this.theme.textPrimaryColor;
  }

  getTextSecondaryColor(): string {
    return this.theme.textSecondaryColor;
  }

  getBoxColor(): string {
    return this.theme.boxColor;
  }

  getBoxShadow(): string {
    return this.theme.boxShadow;
  }

  getPaginationDisabledBGColor(): string {
    return this.theme.paginationDisabledBGColor;
  }

  getPaginationActiveBGColor(): string {
    return this.theme.paginationActiveBGColor;
  }

  getPaginationBGColor(): string {
    return this.theme.paginationBGColor;
  }

  getPaginationTXTColor(): string {
    return this.theme.paginationTXTColor;
  }
}
