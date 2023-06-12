import { LookUpModel } from "../../core/infrastructure/models";

export const DEAL_TYPES: LookUpModel[] = [
  { value: "BUY", viewValue: "Cash currency purchase" },
  { value: "SELL", viewValue: "Cash currency sales" },
  { value: "CLBUY", viewValue: "Cashless currency purchase" },
  { value: "CLSELL", viewValue: "Cashless currency sales" },
]
