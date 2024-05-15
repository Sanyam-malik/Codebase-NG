import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CodebaseService } from '../../services/codebase.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-focus',
  templateUrl: './focus.component.html',
  styleUrl: './focus.component.scss'
})
export class FocusComponent implements OnInit, OnDestroy {

  audioFiles: any[] = [];
  currentAudioIndex = 0;
  audioElement: HTMLAudioElement | undefined;
  interval: any;

  constructor(private codebase: CodebaseService, private router: Router, private http: HttpClient, private message: NzMessageService) {
    if(!this.codebase.timerRunning) {
      this.router.navigate(["/dashboard"]);
    } else {
      document.documentElement.requestFullscreen();
    }

    this.codebase.timerEvents$.asObservable().subscribe(res=> {
      this.interval = setTimeout(() => {
        if(res === 'stopped' && !this.codebase.timerRunning) {
          clearTimeout(this.interval);
          this.router.navigate(["/dashboard"]);
        }
      }, 10);
    })
  }

  playNext() {
    this.currentAudioIndex = (this.currentAudioIndex + 1) % this.audioFiles.length;
    this.playCurrentAudio();
  }

  playCurrentAudio() {
    const audioFile = this.audioFiles[this.currentAudioIndex];
    if(this.audioElement) {
      this.message.success('Now Playing: '+audioFile['name']);
      this.audioElement.src = audioFile['url'];
      this.audioElement.load();
      this.audioElement.play();
    }
  }

  ngOnInit(): void {
    this.http.get(`${environment.baseURL}/songs`).subscribe((response: any) => {
      this.audioFiles = response["songs"];
      if(this.audioFiles.length > 0) {
        this.audioElement = new Audio();
        this.playCurrentAudio();
        this.audioElement.addEventListener('ended', () => this.playNext());
      }
    });
  }

  ngOnDestroy() {
    this.message.success('Focus Mode Terminated Successfully....');
    this.audioElement?.pause();
  }

  get minutes() {
    return this.codebase.minutes;
  }

  get seconds() {
    return this.codebase.seconds;
  }
}
