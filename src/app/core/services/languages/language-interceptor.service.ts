import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from '../../../storage/local-storage.service';
import { Observable } from 'rxjs';
import { Store, State } from 'src/app/shared/store';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LanguageInterceptorService {
  constructor(
    private authService: AuthService,
    private store: Store<State>,
    private localStorage: LocalStorageService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { language } = this.store.getState();
    if (
      (this.authService.isAuthenticated() || language) &&
      this.localStorage.get('language').toString()
    ) {
      const newRequest = req.clone({
        setHeaders: {
          'Accept-Language': this.localStorage.get('language').toString(),
        },
      });
      return next.handle(newRequest);
    }

    return next.handle(req);
  }
}
