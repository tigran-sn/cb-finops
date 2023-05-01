import { Component } from '@angular/core';

import { IMenu } from '../../../core/infrastructure/interfaces';

import { needConfirmation } from '../../../shared/decorators';

import { PATHS } from './navigation.data';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  paths: IMenu[] = PATHS;

  constructor() {}

  @needConfirmation({
    title: 'Log Out',
    message: 'Are you sure you want to log out?',
  })
  logout(): void {
    console.log('Logging out...');
  }
}
