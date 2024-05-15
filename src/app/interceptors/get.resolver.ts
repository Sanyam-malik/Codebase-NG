import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { environment } from '../../environments/environment';

export const getResolver: ResolveFn<any> = (route:ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const http = inject(HttpClient);
  const apiUrl = route.data['url'];
  const apiOptions = route.data['options'];
  return http.get(environment.baseURL+apiUrl, apiOptions);
};
