import { Component } from '@angular/core';

import { IMenu } from '../../../core/infrastructure/interfaces';

import { needConfirmation } from '../../../shared/decorators';

import { PATHS } from './navigation.data';
import { State, Store } from 'src/app/shared/store';
import { Router } from '@angular/router';
import { AuthService, HelperService } from 'src/app/core/services';
import { Environment } from 'src/app/core/infrastructure/models';
import { UserService } from '../../services/user';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  paths: IMenu[] = PATHS;

  constructor(
    private store: Store<State>,
    private auth: AuthService,
    private router: Router,
    // private notificationService: NotificationService,
    public helperService: HelperService,
    private environment: Environment,
    // private confirmationService: ConfirmationService,
    private userService: UserService // public appMain: PrivateComponent,
  ) // public app: AppComponent
  {}

  @needConfirmation({
    title: 'Log Out',
    message: 'Are you sure you want to log out?',
  })
  logout(): void {
    this.helperService.setIgnoreGuardSetting(true);
    this.auth.logOut({});
  }
}
