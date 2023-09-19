import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import * as moment from 'moment';
import { Languages, MomentJSLocale } from '../../infrastructure/enums';
import { LocalStorageService } from '../../../storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  currentLanguage: BehaviorSubject<string> = new BehaviorSubject<string>(
    Languages.English
  );

  constructor(
    private translateService: TranslateService,
    private localStorage: LocalStorageService
  ) {
    if (this.localStorage.get('language')) {
      this.setLanguage(this.localStorage.get('language').toString());
    }
  }

  setLanguage(language: string): void {
    const lang = language ? language : Languages.English;
    this.translateService.use(lang).subscribe((res) => {
      // At this point the lang will be loaded
      this.currentLanguage.next(lang);
    });
    switch (lang) {
      case Languages.English: {
        moment.locale(MomentJSLocale.English);
        break;
      }
      case Languages.Armenian: {
        moment.locale(MomentJSLocale.Armenian);
        break;
      }
    }
  }

  reset(): void {
    this.translateService.use(Languages.Armenian);
    this.currentLanguage.next(Languages.Armenian);
    moment.locale(MomentJSLocale.Armenian);
    this.localStorage.remove('language');
  }

  getCurrentLanguage(): string {
    const localStorageLang = this.localStorage.get('language').toString();
    return localStorageLang ? localStorageLang : Languages.English;
  }

  getTranslation(key: string): string {
    return this.translateService.instant(key);
  }
}
