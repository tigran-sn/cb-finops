import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { catchError, throwError } from 'rxjs';

import { State, Store } from 'src/app/shared/store';
import { CustomSnackbarService } from 'src/app/shared/services';
import { SummaryModel } from '../../../core/infrastructure/models';
import { SummaryService } from '../../services/summary';
import { ISummaryResponse } from '../../interfaces/summary-response.interface';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements AfterViewInit {
  @ViewChild('paginator') paginator: MatPaginator;

  totalData: number;
  dataSource = new MatTableDataSource<SummaryModel>();
  pageSizes = [10, 20, 50, 100];
  displayedColumns: string[] = [
    'dealId',
    'isocode',
    'totalVolume',
    'averageRate',
    'dealType',
    'calculationDate',
  ];
  pageSize = 10;
  pageNumber = 1;

  constructor(
    private summaryService: SummaryService,
    private store: Store<State>,
    private customSnackbarService: CustomSnackbarService
  ) {}

  ngAfterViewInit() {
    this.fetchData(this.pageNumber, this.pageSize);
  }

  onPageEvent(event: PageEvent) {
    this.fetchData(event.pageIndex + 1, event.pageSize);
  }

  private fetchData(pageNumber: number, pageSize: number) {
    this.store.update({ showLoader: true });

    const queryString = `&pageNumber=${pageNumber}&pageSize=${pageSize}`;

    this.summaryService
      .getSummaries(queryString)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.customSnackbarService.openSnackbar(err.message, 'error');
          this.store.update({ showLoader: false });
          return throwError(err);
        })
      )
      .subscribe((res: ISummaryResponse) => {
        this.totalData = res.pagination.totalCount;
        this.dataSource = new MatTableDataSource(res.summaryReports);
        this.store.update({ showLoader: false });
      });
  }
}
