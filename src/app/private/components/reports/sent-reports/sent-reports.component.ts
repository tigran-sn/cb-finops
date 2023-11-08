import {Component, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {_MatTableDataSource, MatTableDataSource} from "@angular/material/table";
import {ReportModel} from "../../../../core/infrastructure/models";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ReportsService} from "../../../services";
import {State, Store} from "../../../../shared/store";
import {ReportTypeEnum} from "../../../../core/infrastructure/enums";
import {IResponse} from "../../../../core/infrastructure/interfaces";
import {ListDataModel} from "../../../../core/infrastructure/models/shared/list-data.model";
import {EditDialogComponent} from "../../edit-dialog/edit-dialog.component";
import {IFilterData, IReport} from "../../../interfaces";
import {appSettings} from "../../../../app.settings";
import {catchError, of, startWith, switchMap} from "rxjs";
import {map, tap} from "rxjs/operators";

@Component({
  selector: 'app-sent-reports',
  templateUrl: './sent-reports.component.html',
  styleUrls: ['./sent-reports.component.scss'],
})
export class SentReportsComponent {
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
    //   .getReports(ReportTypeEnum.Sent, filterData)
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
    return this.reportsService.getReports(ReportTypeEnum.Sent, {}, {
      pageSize,
      pageNumber,
    });
  }
}
