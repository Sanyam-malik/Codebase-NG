import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'urlTool'
})
export class UrlToolPipe implements PipeTransform {

  transform(value: string, action: string): string {
    if (action === 'encode') {
      return encodeURIComponent(value);
    } else if (action === 'decode') {
      return decodeURIComponent(value);
    } else {
      return value;
    }
  }

}
