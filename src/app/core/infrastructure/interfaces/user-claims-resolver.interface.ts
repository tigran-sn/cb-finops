import { UserClaimModel } from '../models';

export interface IUserClaimsResolverInterface<T> {
  userClaimsData: UserClaimModel;
}
