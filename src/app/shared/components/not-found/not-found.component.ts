import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService, LanguageService} from "../../../core/services";

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements OnInit {
  constructor(
    private router: Router,
    private languageService: LanguageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.languageService.reset();
    }
  }

  goToHome() {
    this.router.navigate(['/']);
  }
}
