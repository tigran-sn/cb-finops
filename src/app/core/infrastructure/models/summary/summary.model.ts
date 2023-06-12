import { ISOCodeEnum, DealTypeEnum } from '../../enums';

export class SummaryModel {
  dealId: number;
  isocode: ISOCodeEnum;
  totalVolume: number;
  averageRate: number;
  dealType: DealTypeEnum;
  calculationDate: string;
}
