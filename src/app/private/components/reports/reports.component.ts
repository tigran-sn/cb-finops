import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { catchError, throwError } from 'rxjs';

import { State, Store } from 'src/app/shared/store';
import { ReportModel } from 'src/app/core/infrastructure/models';
import { ReportTypeEnum } from 'src/app/core/infrastructure/enums';
import { CustomSnackbarService } from 'src/app/shared/services';

import { IFilterData, IReport, IReportResponse } from '../../interfaces';
import { ReportsService } from '../../services';
import { appSettings } from '../../../app.settings';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements AfterViewInit {
  @ViewChild('paginator') paginator: MatPaginator;

  filterData: IFilterData;
  totalData: number;
  dataSource = new MatTableDataSource<ReportModel>();
  pageSizes = [10, 20, 50, 100];
  displayedColumns: string[] = [
    'dealId',
    'dealType',
    'participant',
    'partner',
    'isocode',
    'volume',
    'rate',
    'dealDate',
    'calculationDate',
    'status',
  ];
  pageSize = 10;
  pageNumber = 1;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private matDialog: MatDialog,
    private reportsService: ReportsService,
    private store: Store<State>,
    private customSnackbarService: CustomSnackbarService
  ) {}

  ngAfterViewInit() {
    this.fetchData(this.pageNumber, this.pageSize);
  }

  onFilterApplied(filterData: IFilterData): void {
    this.filterData = filterData;
    this.fetchData(this.paginator.pageIndex + 1, this.paginator.pageSize);
  }

  onFilterReset(): void {
    this.filterData = {};
    this.fetchData(this.paginator.pageIndex + 1, this.paginator.pageSize);
  }

  openEditDialog(item: any) {
    const dialogRef = this.matDialog.open(EditDialogComponent, {
      width: `${appSettings.reports.modalWidth}px`,
      data: { item },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const index = this.dataSource.data.indexOf(item);
        this.dataSource.data[index] = result;
      }
    });
  }

  edit(el: IReport): void {
    this.openEditDialog(el);
  }

  downloadXLS(el: IReport): void {
    console.log('downloadXLS', el);
  }

  downloadPDF(el: IReport): void {
    console.log('downloadPDF', el);
  }

  create() {
    this.router.navigate(['create'], {
      relativeTo: this.activatedRoute,
    });
  }

  onPageEvent(event: PageEvent) {
    this.fetchData(event.pageIndex + 1, event.pageSize);
  }

  private fetchData(pageNumber: number, pageSize: number) {
    this.store.update({ showLoader: true });

    const dealType = this.filterData?.dealType || null;
    const start = this.filterData?.range?.start || null;
    const end = this.filterData?.range?.end || null;

    const queryString = `&pageNumber=${pageNumber}&pageSize=${pageSize}${
      dealType ? `&dealType=${dealType}` : ''
    }${start ? `&startDate=${start}` : ''}${end ? `&endDate=${end}` : ''}`;

    this.reportsService
      .getReports(ReportTypeEnum.All, queryString)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.customSnackbarService.openSnackbar(err.message, 'error');
          this.store.update({ showLoader: false });
          return throwError(err);
        })
      )
      .subscribe((res: IReportResponse) => {
        this.totalData = res.pagination.totalCount;
        this.dataSource = new MatTableDataSource(res.reports);
        this.store.update({ showLoader: false });
      });
  }
}
