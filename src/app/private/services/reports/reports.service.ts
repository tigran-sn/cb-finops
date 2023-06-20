import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { HttpService } from 'src/app/http';

import { IResponse } from 'src/app/core/infrastructure/interfaces';
import { ReportModel } from 'src/app/core/infrastructure/models/reports/report.model';
import { ListDataModel } from 'src/app/core/infrastructure/models/shared/list-data.model';
import { REPORTS_API_URL } from './reports.url';
import {ReportsLookupModel, ReportsSearchModel} from 'src/app/core/infrastructure/models';

import {ISOCODES, REPORTS} from '../../mocks';
import { ReportTypeEnum } from "../../../core/infrastructure/enums";
import {DEAL_TYPES} from "../../mocks/deal-types.mock";
import {map} from "rxjs/operators";
import {IFilterData, IReport} from "../../interfaces";

@Injectable()
export class ReportsService {
  constructor(private httpService: HttpService) {}

  private generateQueryParams(filterData: IFilterData): string {
    let params = new HttpParams();

    if (filterData) {
      params = params.appendAll({
        ...(filterData.dealType && { dealType: filterData.dealType }),
        ...(filterData.range && {
          ...filterData.range.start && { 'startDate': filterData.range.start },
          ...filterData.range.end && { 'endDate': filterData.range.end }
        })
      });
    }
    return '&' + params.toString();
  }

  getReports(
    reportType: number,
    filterData?: any
  ): Observable<IResponse<ListDataModel<ReportModel>>> {
    const queryParams = filterData?.dealType || filterData?.range?.start || filterData?.range?.end
      ? this.generateQueryParams(filterData)
      : '';
    return this.httpService.get<ReportModel[]>(`${REPORTS_API_URL.getReports}?status=${reportType}${queryParams}`)
      .pipe(map((res: ReportModel[]) => {
        return {
          success: true,
          data: {
            totalCount: res.length,
            listItems: [...res],
          },
        };
      }));
  }

  sendReports(reportIdList: number[]): Observable<string> {
    return this.httpService.post(`${REPORTS_API_URL.sendReports}`, reportIdList);
  }

  getLookUps(): Observable<IResponse<ReportsLookupModel>> {
    return of({
      data: {
        dealTypes: [...DEAL_TYPES],
        isocodes: [...ISOCODES],
        statuses: [],
      },
      success: true,
    })
    return this.httpService.get(`${REPORTS_API_URL.getLookUps}`);
  }
}
