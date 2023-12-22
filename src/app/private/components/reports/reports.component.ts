import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import {
  MatTableDataSource,
  _MatTableDataSource,
} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { Observable, catchError, throwError } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { State, Store } from 'src/app/shared/store';
import {
  FilterModel,
  ReportModel,
  ReportsLookupModel,
} from 'src/app/core/infrastructure/models';
import { IResponse } from 'src/app/core/infrastructure/interfaces';
import { ReportTypeEnum } from 'src/app/core/infrastructure/enums';
import { CustomSnackbarService } from 'src/app/shared/services';

import { IDealType, IReport, IReportResponse } from '../../interfaces';
import { ReportsService } from '../../services';
import { appSettings } from '../../../app.settings';
import { LookupsService } from '../../services/lookups/lookups.service';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit, AfterViewInit {
  @ViewChild('paginator') paginator: MatPaginator;

  controls: FilterModel;
  form: FormGroup;
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  dealType = new FormControl();
  dealTypes: IDealType[];
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
    private fb: FormBuilder,
    private lookupsService: LookupsService,
    private customSnackbarService: CustomSnackbarService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.getLookUps().pipe(first()).subscribe();
    this.initForm();
  }

  ngAfterViewInit() {
    this.fetchData(this.pageNumber, this.pageSize);
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

  applyFilter() {
    this.fetchData(this.paginator.pageIndex + 1, this.paginator.pageSize);
  }

  resetFilter(): void {
    this.form.reset();
    this.fetchData(this.paginator.pageIndex + 1, this.paginator.pageSize);
  }

  private initForm() {
    this.form = this.fb.group({
      dealType: this.dealType,
      range: this.range,
    });
    this.setControls();
  }

  private setControls() {
    this.controls = {
      dealType: this.form.get('dealType') as FormControl,
      range: this.form.get('range') as FormGroup,
    };
  }

  private getLookUps(): Observable<IResponse<ReportsLookupModel>> {
    return this.lookupsService.getLookUps().pipe(
      map((res: IResponse<ReportsLookupModel>) => {
        if (res.success) {
          this.dealTypes = res.data.dealTypes;
        }
        return res;
      })
    );
  }

  private fetchData(pageNumber: number, pageSize: number) {
    this.store.update({ showLoader: true });

    const dealType = this.form.get('dealType')?.value || null;
    const start =
      this.datePipe.transform(this.range?.get('start')?.value, 'dd-MM-yyyy') ||
      null;
    const end =
      this.datePipe.transform(this.range?.get('end')?.value, 'dd-MM-yyyy') ||
      null;

    const queryString = `&pageNumber=${pageNumber}&pageSize=${pageSize}${
      dealType ? `&dealType=${dealType}` : ''
    }${start ? `&startDate=${start}` : ''}${end ? `&endDate=${end}` : ''}`;

    this.reportsService
      .getReportsNew(ReportTypeEnum.All, queryString)
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
