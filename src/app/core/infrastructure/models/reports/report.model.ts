import { ISOCodeEnum, ReportStatusEnum, DealTypeEnum } from '../../enums';

export class ReportModel {
  dealId: number;
  dealType: DealTypeEnum;
  participant: string;
  partner: string;
  isocode: ISOCodeEnum;
  volume: number;
  rate: number;
  dealDate: string;
  calculationDate: string;
  status: ReportStatusEnum;
}
