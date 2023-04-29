import { Component } from '@angular/core';

import { needConfirmation } from '../../../shared/decorators';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  constructor() {}

  @needConfirmation({
    title: 'Log Out',
    message: 'Are you sure you want to log out?'
  })
  logout(): void {
    console.log('Logging out...')
  }
}
