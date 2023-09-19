import {Observable, of} from "rxjs";
import {IResponse} from "../../../core/infrastructure/interfaces";
import {LookupsModel} from "../../../core/infrastructure/models";
import {DEAL_TYPES} from "../../mocks/deal-types.mock";
import {ISOCODES} from "../../mocks";
import {HttpService} from "../../../http";
import {LOOKUPS_API_URL} from "./lookups.url";
import {Injectable} from "@angular/core";

@Injectable()
export class LookupsService {
  constructor(private httpService: HttpService) {
  }
  getLookUps(): Observable<IResponse<LookupsModel>> {
    return of({
      data: {
        dealTypes: [...DEAL_TYPES],
        isocodes: [...ISOCODES],
      },
      success: true,
    })
    // TODO Apply the code below after BE will provide lookups
    // return this.httpService.get(`${LOOKUPS_API_URL.getLookUps}`);
  }
}
