import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { environment } from '../../environments/environment';

export const postResolver: ResolveFn<any> = (route, state) => {
  const http = inject(HttpClient);
  const apiUrl = route.data['url'];
  const apiOptions = route.data['options'];
  Object.keys(apiOptions).forEach(key => {
    const value = apiOptions[key];
    if (typeof value === 'string' && value.includes('<<') && value.includes('>>')) {
      var refKey = value.replace("<<", "").replace('>>', "").trim(); 
      apiOptions[key] = value.replace(value, String(route.paramMap.get(refKey)));
    }
  });
  return http.get(environment.baseURL+apiUrl, apiOptions);
};
