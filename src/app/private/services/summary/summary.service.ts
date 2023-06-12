import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpService } from 'src/app/http';

import { IResponse } from 'src/app/core/infrastructure/interfaces';
import { ListDataModel } from 'src/app/core/infrastructure/models/shared/list-data.model';
import { SUMMARY_URL } from './summary.url';
import {SummaryLookupModel, SummaryModel} from 'src/app/core/infrastructure/models';

import {ISOCODES, REPORTS} from '../../mocks';
import {DEAL_TYPES} from "../../mocks/deal-types.mock";
import {map} from "rxjs/operators";
import {ISummary} from "../../interfaces";

@Injectable()
export class SummaryService {
  constructor(private httpService: HttpService) {}

  getSummaries(): Observable<IResponse<ListDataModel<SummaryModel>>> {
    return this.httpService.get<ISummary[]>(`${SUMMARY_URL.getSummaryData}`)
      .pipe(map((res: ISummary[]) => {
        return {
          success: true,
          data: {
            totalCount: res.length,
            listItems: [...res],
          },
        };
      }));
  }

  getLookUps(): Observable<IResponse<SummaryLookupModel>> {
    return of({
      data: {
        dealTypes: [...DEAL_TYPES],
        isocodes: [...ISOCODES],
        statuses: [],
      },
      success: true,
    })
    return this.httpService.get(`${SUMMARY_URL.getLookUps}`);
  }
}
