import { Injectable, Inject } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpEvent,
  HttpErrorResponse,
  HttpHandler,
} from '@angular/common/http';
import { AuthorizationStrategy } from './interfaces';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class UnAuthInterceptor implements HttpInterceptor {
  constructor(@Inject('STRATEGY') private strategy: AuthorizationStrategy) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {},
        (err: any) => {
          if (err instanceof HttpErrorResponse && err.status === 401) {
            this.strategy.onUnAuthorized();
          }
        }
      )
    );
  }
}
