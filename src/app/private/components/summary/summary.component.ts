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
import {map, tap} from "rxjs/operators";
import {catchError, of, startWith, switchMap} from "rxjs";

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit {
  @ViewChild('paginator') paginator: MatPaginator;

  language: string;
  dataSource = new MatTableDataSource<SummaryModel>();
  totalData: number;
  pageSizes = [10, 20, 50, 100];
  displayedColumns: string[] = [
    'dealId',
    'isocode',
    'totalVolume',
    'averageRate',
    'dealType',
    'calculationDate',
  ];

  constructor(
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
  }

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

  private getTableData$(pageNumber: number, pageSize: number) {
    return this.summaryService
      .getSummaries({ pageSize, pageNumber })
  }
}
