import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../../http';

import { IAdmin, IResponse } from '../../../core/infrastructure/interfaces';
import { UserClaimModel } from '../../../core/infrastructure/models';
import { USER_API_URL } from './user.url';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpService) {}

  getCurrentUserClaims(): Observable<IResponse<UserClaimModel>> {
    return this.http.get(USER_API_URL.currentUserClaims);
  }

  acceptTC(): Observable<IResponse<null>> {
    return this.http.put(USER_API_URL.acceptTC, {});
  }
}
