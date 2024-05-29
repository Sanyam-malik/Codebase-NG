import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { catchError, of } from 'rxjs';

function deepClone(obj: any) {
  return JSON.parse(JSON.stringify(obj));
}

export const postResolver: ResolveFn<any> = (route, state) => {
  const http = inject(HttpClient);
  const router = inject(Router);
  var apiUrl = route.data['url'];
  const apiPaths = route.data['paths'];
  const apiOptions = deepClone(route.data['options']);
  var paths = [];

  if(apiPaths) {
    for(var path of apiPaths) {
      if(path.includes('<<') && path.includes('>>')) {
        var refKey = path.replace("<<", "").replace('>>', "").trim();
        paths.push(String(route.paramMap.get(refKey)));
      } else {
        paths.push(path.trim());
      } 
    }
  }

  if (apiOptions['params']) {
    const params = apiOptions['params'];

    Object.keys(params).forEach(key => {
      const value = params[key];
      if (typeof value === 'string' && value.includes('<<') && value.includes('>>')) {
        const refKey = value.replace("<<", "").replace('>>', "").trim();
        params[key] = String(route.paramMap.get(refKey));
      }
    });

    apiOptions['params'] = params;
  }

  if (apiOptions['headers']) {
    const headers = apiOptions['headers'];

    Object.keys(headers).forEach(key => {
      const value = headers[key];
      if (typeof value === 'string' && value.includes('<<') && value.includes('>>')) {
        const refKey = value.replace("<<", "").replace('>>', "").trim();
        headers[key] = String(route.paramMap.get(refKey));
      }
    });

    apiOptions['headers'] = headers;
  }

  if(paths.length > 0) {
    apiUrl = apiUrl + "/" +paths.join("/");
  }
  return http.post(apiUrl, null, apiOptions).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 404) {
        // Redirect to the desired page
        router.navigate(['/not-found']);
      }
      // Return an observable with a default value (or empty)
      return of(null);
    })
  );
};
