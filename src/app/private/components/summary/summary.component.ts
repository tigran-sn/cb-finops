import { Component, OnInit, ViewChild } from '@angular/core';
// import { LiveAnnouncer } from '@angular/cdk/a11y';

import { MatPaginator } from '@angular/material/paginator';
import {_MatTableDataSource, MatTableDataSource} from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LanguageService } from 'src/app/core/services';
import { ISummary } from "../../interfaces";
import {ReportTypeEnum} from "../../../core/infrastructure/enums";
import {IResponse} from "../../../core/infrastructure/interfaces";
import {ListDataModel} from "../../../core/infrastructure/models/shared/list-data.model";
import {ReportModel, SummaryModel} from "../../../core/infrastructure/models";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ReportsService} from "../../services";
import {State, Store} from "../../../shared/store";
import {SummaryService} from "../../services/summary";

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit {
  displayedColumns: string[] = [
    'dealId',
    'isocode',
    'totalVolume',
    'averageRate',
    'dealType',
    'calculationDate',
  ];
  language: string;
  dataSource: MatTableDataSource<SummaryModel>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    // private _liveAnnouncer: LiveAnnouncer,
    // private languageService: LanguageService
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private matDialog: MatDialog,
    private summaryService: SummaryService,
    private store: Store<State>
  ) {}

  ngOnInit(): void {
    // this.languageService.currentLanguage.subscribe(
    //   (lang) => (this.language = lang)
    // );
    this.store.update({ showLoader: true });
    this.summaryService
      .getSummaries()
      .subscribe((res: IResponse<ListDataModel<SummaryModel>>) => {
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

  /** Announce the change in sort state for assistive technology. */
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
}
