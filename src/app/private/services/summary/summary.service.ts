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
import {IPaginationParams, ISummary} from "../../interfaces";
import {ISummaryResponse} from "../../interfaces/summary-response.interface";
import {HttpParams} from "@angular/common/http";

@Injectable()
export class SummaryService {
  constructor(private httpService: HttpService) {}

  getSummaries(paginationParams?: IPaginationParams,): Observable<IResponse<ListDataModel<SummaryModel>>> {
    let queryParams = paginationParams?.pageNumber ?? paginationParams?.pageSize
      ? this.generatePaginationParams(paginationParams)
      : '';
    return this.httpService.get<ISummaryResponse>(`${SUMMARY_URL.getSummaryData}?${queryParams}`)
      .pipe(map((res: ISummaryResponse) => {
        return {
          success: true,
          data: {
            totalCount: res.pagination.totalCount,
            listItems: [...res.summaryReports],
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

  private generatePaginationParams(paginationParams: IPaginationParams): string {
    let params = new HttpParams();

    if (paginationParams) {
      params = params.appendAll({
        ...(paginationParams.pageSize && { pageSize: paginationParams.pageSize }),
        ...(paginationParams.pageNumber && { pageNumber: paginationParams.pageNumber }),
      });
    }
    return params.toString();
  }
}
