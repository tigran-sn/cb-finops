import { ISOCodeEnum, ReportStatusEnum, DealTypeEnum } from '../../enums';

export class ReportCreationModel {
  dealType: DealTypeEnum;
  partner: string;
  isocode: ISOCodeEnum;
  volume: number;
  rate: number;
  dealDate: string;
  isSend: boolean;
}
