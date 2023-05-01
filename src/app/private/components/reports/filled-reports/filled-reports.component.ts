import { Component, ViewChild } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

import { EditDialogComponent } from '../../edit-dialog/edit-dialog.component';

import { IReport } from '../../../interfaces';
import { REPORTS } from '../../../mocks';

@Component({
  selector: 'app-filled-reports',
  templateUrl: './filled-reports.component.html',
  styleUrls: ['./filled-reports.component.scss'],
})
export class FilledReportsComponent {
  displayedColumns: string[] = ['reportName', 'dateTime'];
  dataSource = new MatTableDataSource<IReport>(REPORTS);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private matDialog: MatDialog
  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openEditDialog(item: any) {
    const dialogRef = this.matDialog.open(EditDialogComponent, {
      width: '600px',
      data: { item },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // update the item in the table
        const index = this.dataSource.data.indexOf(item);
        this.dataSource.data[index] = result;
      }
    });
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  edit(el: IReport): void {
    console.log('edit', el);
    this.openEditDialog(el);
  }

  downloadXLS(el: IReport): void {
    console.log('downloadXLS', el);
  }

  downloadPDF(el: IReport): void {
    console.log('downloadPDF', el);
  }
}
