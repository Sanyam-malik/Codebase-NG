import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { environment } from '../../environments/environment';

export const getResolver: ResolveFn<any> = (route:ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const http = inject(HttpClient);
  var apiUrl = route.data['url'];
  const apiPaths = route.data['paths'];
  const apiOptions = route.data['options'];
  var paths = [];
  for(var path of apiPaths) {
    if(path.includes('<<') && path.includes('>>')) {
      var refKey = path.replace("<<", "").replace('>>', "").trim();
      paths.push(String(route.paramMap.get(refKey)));
    } else {
      paths.push(path.trim());
    } 
  }

  Object.keys(apiOptions).forEach(key => {
    const value = apiOptions[key];
    if (typeof value === 'string' && value.includes('<<') && value.includes('>>')) {
      var refKey = value.replace("<<", "").replace('>>', "").trim(); 
      apiOptions[key] = value.replace(value, String(route.paramMap.get(refKey)));
    }
  });

  if(paths.length > 0) {
    apiUrl = apiUrl + "/" +paths.join("/");
  }
  return http.get(environment.baseURL+apiUrl, apiOptions);
};
