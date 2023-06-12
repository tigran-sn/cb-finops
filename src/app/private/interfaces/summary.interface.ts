import { DealTypeEnum, ISOCodeEnum } from "../../core/infrastructure/enums";

export interface ISummary {
  dealId: number;
  isocode: ISOCodeEnum;
  totalVolume: number;
  averageRate: number;
  dealType: DealTypeEnum;
  calculationDate: string;
}
