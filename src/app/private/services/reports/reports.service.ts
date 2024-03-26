import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { HttpService } from 'src/app/http';

import { IPartner, IResponse } from 'src/app/core/infrastructure/interfaces';
import { ReportModel } from 'src/app/core/infrastructure/models/reports/report.model';
import { ListDataModel } from 'src/app/core/infrastructure/models/shared/list-data.model';
import { REPORTS_API_URL } from './reports.url';
import {
  PartnerModel,
  ReportCreationModel,
  ReportsLookupModel,
  ReportsSearchModel,
} from 'src/app/core/infrastructure/models';

import { ISOCODES, REPORTS } from '../../mocks';
import { ReportTypeEnum } from '../../../core/infrastructure/enums';
import { DEAL_TYPES } from '../../mocks/deal-types.mock';
import { map } from 'rxjs/operators';
import {
  IFilterData,
  IPaginationParams,
  IReport,
  IReportResponse,
} from '../../interfaces';

@Injectable()
export class ReportsService {
  constructor(private httpService: HttpService) {}

  getReports(status: number, queryParams: string): Observable<IReportResponse> {
    return this.httpService.get<IReportResponse>(
      `${REPORTS_API_URL.getReports}?status=${status}${queryParams}`
    );
  }

  sendReports(reportIdList: number[]): Observable<string> {
    return this.httpService.post(
      `${REPORTS_API_URL.sendReports}`,
      reportIdList
    );
  }

  createReport(reportBody: ReportCreationModel): Observable<string> {
    return this.httpService.post(`${REPORTS_API_URL.createReport}`, reportBody);
  }

  getLookUps(): Observable<IResponse<ReportsLookupModel>> {
    return of({
      data: {
        dealTypes: [...DEAL_TYPES],
        isocodes: [...ISOCODES],
        statuses: [],
      },
      success: true,
    });
    return this.httpService.get(`${REPORTS_API_URL.getLookUps}`);
  }

  getPartnersList(): Observable<IResponse<ListDataModel<PartnerModel>>> {
    return this.httpService
      .get<PartnerModel[]>(`${REPORTS_API_URL.getPartnersList}`)
      .pipe(
        map((res: PartnerModel[]) => {
          return {
            success: true,
            data: {
              totalCount: res.length,
              listItems: [...res],
            },
          };
        })
      );
  }

  saveReport(report: IReport): Observable<string> {
    return this.httpService.post(`${REPORTS_API_URL.updateReport}`, report);
  }
}
