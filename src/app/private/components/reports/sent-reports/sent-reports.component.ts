import {Component, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
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

@Component({
  selector: 'app-sent-reports',
  templateUrl: './sent-reports.component.html',
  styleUrls: ['./sent-reports.component.scss'],
})
export class SentReportsComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;

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
  // dataSource = new MatTableDataSource<IReport>(REPORTS);
  dataSource: MatTableDataSource<ReportModel>;

  constructor(
    // private _liveAnnouncer: LiveAnnouncer,new MatTableDataSource<IReport>(REPORTS);
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private matDialog: MatDialog,
    private reportsService: ReportsService,
    private store: Store<State>
  ) {}

  ngOnInit(): void {
    this.store.update({ showLoader: true });
    this.reportsService
      .getReports(ReportTypeEnum.Sent)
      .subscribe((res: IResponse<ListDataModel<ReportModel>>) => {
        if (res.success) {
          this.dataSource = new _MatTableDataSource(res.data.listItems);
          this.dataSource.paginator = this.paginator;
          // this.dataSource.sort = this.sort;

          this.store.update({ showLoader: false });
        }
      });
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
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

  // /** Announce the change in sort state for assistive technology. */
  // announceSortChange(sortState: Sort) {
  //   // This example uses English messages. If your application supports
  //   // multiple language, you would internationalize these strings.
  //   // Furthermore, you can customize the message to add additional
  //   // details about the values being sorted.
  //   if (sortState.direction) {
  //     this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
  //   } else {
  //     this._liveAnnouncer.announce('Sorting cleared');
  //   }
  // }

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
    this.store.update({ showLoader: true });
    this.reportsService
      .getReports(ReportTypeEnum.Sent, filterData)
      .subscribe((res: IResponse<ListDataModel<ReportModel>>) => {
        if (res.success) {
          this.dataSource = new _MatTableDataSource(res.data.listItems);
          this.dataSource.paginator = this.paginator;
          // this.dataSource.sort = this.sort;

          this.store.update({ showLoader: false });
        }
      });
  }
}
