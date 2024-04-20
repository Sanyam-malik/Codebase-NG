import { Component } from '@angular/core';
import { CodebaseService } from './codebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(private codebase: CodebaseService) {
    this.codebase.getData();
  }

}
