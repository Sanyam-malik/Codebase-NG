import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { environment } from '../environments/environment';

export const postResolver: ResolveFn<any> = (route, state) => {
  const http = inject(HttpClient);
  const apiUrl = route.data['url'];
  const apiOptions = route.data['options'];
  return http.get(environment.baseURL+apiUrl, apiOptions);
};
