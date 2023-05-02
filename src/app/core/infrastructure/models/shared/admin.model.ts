import { IAdmin } from '../../interfaces/admin.interface';
export class AdminModel implements IAdmin {
  id: number;
  email: string;
  fullName: string;
  createdDate: Date;
}
