import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpService } from 'src/app/http';

import { IResponse } from 'src/app/core/infrastructure/interfaces';
import { ListDataModel } from 'src/app/core/infrastructure/models/shared/list-data.model';
import { SUMMARY_URL } from './summary.url';
import {
  SummaryLookupModel,
  SummaryModel,
} from 'src/app/core/infrastructure/models';

import { ISOCODES, REPORTS } from '../../mocks';
import { DEAL_TYPES } from '../../mocks/deal-types.mock';
import { map, tap } from 'rxjs/operators';
import { IPaginationParams, ISummary } from '../../interfaces';
import { ISummaryResponse } from '../../interfaces/summary-response.interface';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class SummaryService {
  constructor(private httpService: HttpService) {}

  getSummaries(queryString: string): Observable<ISummaryResponse> {
    return this.httpService.get<ISummaryResponse>(
      `${SUMMARY_URL.getSummaryData}?${queryString}`
    );
  }

  getLookUps(): Observable<IResponse<SummaryLookupModel>> {
    return of({
      data: {
        dealTypes: [...DEAL_TYPES],
        isocodes: [...ISOCODES],
        statuses: [],
      },
      success: true,
    });
    return this.httpService.get(`${SUMMARY_URL.getLookUps}`);
  }
}
