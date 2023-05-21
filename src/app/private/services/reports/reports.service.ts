import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpService } from 'src/app/http';

import { IResponse } from 'src/app/core/infrastructure/interfaces';
import { ReportModel } from 'src/app/core/infrastructure/models/reports/report.model';
import { ListDataModel } from 'src/app/core/infrastructure/models/shared/list-data.model';
import { REPORTS_API_URL } from './reports.url';
import { ReportsSearchModel } from 'src/app/core/infrastructure/models';

import { REPORTS } from '../../mocks';

@Injectable()
export class ReportsService {
  constructor(private httpService: HttpService) {}

  getReports(
    reportSearchModel: ReportsSearchModel
  ): Observable<IResponse<ListDataModel<ReportModel>>> {
    return of({
      success: true,
      data: {
        totalCount: 100,
        listItems: [...REPORTS],
      },
    });
    return this.httpService.post(
      `${REPORTS_API_URL.getReports}`,
      reportSearchModel
    );
  }
}
