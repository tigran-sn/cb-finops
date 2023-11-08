import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { LiveAnnouncer } from '@angular/cdk/a11y';

import { MatPaginator } from '@angular/material/paginator';
import {
  MatTableDataSource,
  _MatTableDataSource,
} from '@angular/material/table';
// import { MatSort, Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';

import {IFilterData, IReport} from '../../interfaces';
import { ReportsService } from '../../services';
import { State, Store } from 'src/app/shared/store';
import { ReportModel } from 'src/app/core/infrastructure/models';
import { IResponse } from 'src/app/core/infrastructure/interfaces';
import { ListDataModel } from 'src/app/core/infrastructure/models/shared/list-data.model';
import { ReportTypeEnum } from 'src/app/core/infrastructure/enums';
import {appSettings} from "../../../app.settings";
import {map, tap} from "rxjs/operators";
import {catchError, of, startWith, switchMap} from "rxjs";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit, AfterViewInit {
  @ViewChild('paginator') paginator: MatPaginator;

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

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private matDialog: MatDialog,
    private reportsService: ReportsService,
    private store: Store<State>
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.store.update({ showLoader: true });

    this.paginator.page
      .pipe(
        tap(() => {
          this.store.update({ showLoader: true });
        }),
        startWith({}),
        switchMap(() => {
          return this.getTableData$(
            this.paginator.pageIndex + 1,
            this.paginator.pageSize
          ).pipe(catchError(() => of(null)));
        }),
        map((res) => {
          if (res == null) return [];
          this.totalData = res.data.totalCount;
          return res.data.listItems;
        })
      )
      .subscribe((res) => {
        this.dataSource = new MatTableDataSource(res);
        this.store.update({ showLoader: false });
      });
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

  filter(filterData: IFilterData): void {
    // this.store.update({ showLoader: true });
    // this.reportsService
    //   .getReports(ReportTypeEnum.All, filterData)
    //   .subscribe((res: IResponse<ListDataModel<ReportModel>>) => {
    //     if (res.success) {
    //       this.dataSource = new _MatTableDataSource(res.data.listItems);
    //       this.dataSource.paginator = this.paginator;
    //       // this.dataSource.sort = this.sort;
    //
    //       this.store.update({ showLoader: false });
    //     }
    //   });
  }

  private getTableData$(pageNumber: number, pageSize: number) {
    return this.reportsService.getReports(ReportTypeEnum.All, {}, {
      pageSize,
      pageNumber,
    });
  }
}
