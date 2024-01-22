import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';

import { catchError, throwError, switchMap } from 'rxjs';

import { State, Store } from 'src/app/shared/store';
import { ReportModel } from 'src/app/core/infrastructure/models';
import { ReportTypeEnum, Urls } from 'src/app/core/infrastructure/enums';
import { CustomSnackbarService } from 'src/app/shared/services';
import { IFilterData, IReport, IReportResponse } from '../../../interfaces';
import { ReportsService } from '../../../services';
import { appSettings } from '../../../../app.settings';
import { EditDialogComponent } from '../../edit-dialog/edit-dialog.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-filled-reports',
  templateUrl: './filled-reports.component.html',
  styleUrls: ['./filled-reports.component.scss'],
})
export class FilledReportsComponent {
  @ViewChild('paginator') paginator: MatPaginator;

  filterData: IFilterData;
  totalData: number;
  dataSource = new MatTableDataSource<ReportModel>();
  pageSizes = [10, 20, 50, 100];
  displayedColumns: string[] = [
    'select',
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
  selection = new SelectionModel<ReportModel>(true, []);

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private matDialog: MatDialog,
    private reportsService: ReportsService,
    private store: Store<State>,
    private customSnackbarService: CustomSnackbarService,
    private translateService: TranslateService
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
        this.reportsService.saveReport(result).subscribe(() => {
          this.customSnackbarService.openSnackbar(
            this.translateService.instant('SuccessfullyUpdated'),
            'success'
          );
          this.fetchData(1, 10);
        });
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

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection?.selected?.length;
    const numRows = this.dataSource?.data?.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: ReportModel): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.dealId + 1
    }`;
  }

  sendSelectedReports(reports: SelectionModel<ReportModel>): void {
    this.store.update({ showLoader: true });
    this.reportsService
      .sendReports(this.getIdList(reports))
      .pipe(
        catchError((err) => {
          this.customSnackbarService.openSnackbar(err.error.message, 'error');
          this.store.update({ showLoader: false });
          return throwError(err);
        })
      )
      .subscribe((res) => {
        this.customSnackbarService.openSnackbar(res, 'success');
        this.store.update({ showLoader: false });
        this.router.navigate([`./${Urls.Reports}/${Urls.SentReports}`]);
      });
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
      .getReports(ReportTypeEnum.Filled, queryString)
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

  private getIdList(reports: SelectionModel<ReportModel>): number[] {
    return reports.selected.map((report) => report.dealId);
  }
}
