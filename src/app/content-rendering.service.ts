import { Injectable } from '@angular/core';

export interface ContentButtons {
  name: string,
  class: string,
  action: any
}

export interface ContentRenderer{
  title: string,
  content: string,
  type: string,
  element?: any
  buttons?: ContentButtons[]
}

@Injectable({
  providedIn: 'root'
})

export class ContentRenderingService {

  constructor() { }

  rendering: ContentRenderer[] = []

  get size(): number {
    return this.rendering.length;
  }

  get last(): ContentRenderer {
    return this.rendering[this.size - 1];
  }

  get empty(): boolean {
    return this.size == 0;
  }
}
