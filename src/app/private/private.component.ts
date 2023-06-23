import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { Store, State } from '../shared/store';
import { Languages } from '../core/infrastructure/enums';
import { AuthService } from '../core/services';
import { LanguageService } from '../core/services';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.scss']
})
export class PrivateComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private store: Store<State>,
    private activatedRoute: ActivatedRoute,
    private languageService: LanguageService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data
      .pipe(first())
      .subscribe((response: any) => {
        this.languageService.setLanguage(Languages.Armenian);
        this.store.update({ userClaims: response.userClaimsData });
      });
  }

}
