import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';

import { MatPaginator } from '@angular/material/paginator';
import {
  MatTableDataSource,
  _MatTableDataSource,
} from '@angular/material/table';
// import { MatSort, Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

import { EditDialogComponent } from '../../edit-dialog/edit-dialog.component';

import {IFilterData, IReport} from '../../../interfaces';
import { ReportsService } from '../../../services';
import { State, Store } from 'src/app/shared/store';
import { switchMap } from 'rxjs';
import { ReportModel } from 'src/app/core/infrastructure/models';
import { IResponse } from 'src/app/core/infrastructure/interfaces';
import { ListDataModel } from 'src/app/core/infrastructure/models/shared/list-data.model';
import { ReportTypeEnum } from 'src/app/core/infrastructure/enums';
import {appSettings} from "../../../../app.settings";

@Component({
  selector: 'app-filled-reports',
  templateUrl: './filled-reports.component.html',
  styleUrls: ['./filled-reports.component.scss'],
})
export class FilledReportsComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;

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
  // dataSource = new MatTableDataSource<IReport>(REPORTS);
  dataSource: MatTableDataSource<ReportModel>;
  selection = new SelectionModel<ReportModel>(true, []);

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
      .getReports(ReportTypeEnum.Filled)
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

  private getIdList(reports: SelectionModel<ReportModel>): number[] {
    return reports.selected.map(report => report.dealId);
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
      .getReports(ReportTypeEnum.Filled, filterData)
      .subscribe((res: IResponse<ListDataModel<ReportModel>>) => {
        if (res.success) {
          this.dataSource = new _MatTableDataSource(res.data.listItems);
          this.dataSource.paginator = this.paginator;
          // this.dataSource.sort = this.sort;

          this.store.update({ showLoader: false });
        }
      });
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
    this.reportsService.sendReports(this.getIdList(reports))
      .pipe(
        switchMap(() => {
          return this.reportsService.getReports(ReportTypeEnum.Filled);
        })
      )
      .subscribe((res) => {
        if (res.success) {
          this.dataSource = new _MatTableDataSource(res.data.listItems);
          this.dataSource.paginator = this.paginator;
          this.selection = new SelectionModel<ReportModel>(true, []);
          // this.dataSource.sort = this.sort;

          this.store.update({ showLoader: false });
        }
      });
  }
}
