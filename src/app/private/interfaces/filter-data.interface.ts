import { DealTypeEnum } from "../../core/infrastructure/enums";

export interface IFilterData {
  dealType?: DealTypeEnum,
  range?: {
    start: string,
    end: string,
  },
}
