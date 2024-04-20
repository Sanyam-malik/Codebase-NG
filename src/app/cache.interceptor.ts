import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpResponse,
  HttpEvent
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isCacheable(req)) {
      return next.handle(req);
    }

    const cachedResponse = this.readFromCache(req.url);

    if (cachedResponse && this.isCacheValid(cachedResponse.timestamp)) {
      // Manually create a deep copy of the response
      var url = cachedResponse?.response?.url != null ? cachedResponse.response.url : undefined;
      const clonedResponse = new HttpResponse({
        body: JSON.parse(JSON.stringify(cachedResponse.response.body)), // Deep copy the body
        status: cachedResponse.response.status,
        statusText: cachedResponse.response.statusText,
        headers: cachedResponse.response.headers,
        url: url
      });
      return of(clonedResponse);
    }

    // Proceed with the actual request
    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          // Cache the response
          this.writeToCache(req.url, event);
        }
      })
    );
  }

  private isCacheable(req: HttpRequest<any>): boolean {
    // Customize this logic based on your requirements (e.g., allow only GET requests)
    return req.method === 'GET' && !req.url.includes('/status');
  }

  private writeToCache(key: string, response: HttpResponse<any>): void {
    localStorage.setItem(key, JSON.stringify({ response, timestamp: Date.now() }));
  }

  private readFromCache(key: string): { response: HttpResponse<any>, timestamp: number } | null {
    const cachedData = localStorage.getItem(key);
    return cachedData ? JSON.parse(cachedData) : null;
  }

  private isCacheValid(timestamp: number): boolean {
    const cacheExpiration = 2 * 60 * 1000; // 2 minutes
    return Date.now() - timestamp < cacheExpiration;
  }
}
