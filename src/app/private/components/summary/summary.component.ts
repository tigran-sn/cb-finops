import { Component, ViewChild } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent {
  displayedColumns: string[] = [
    'position',
    'iso',
    'totalVolume',
    'weightedAverageExchangeRate',
    'transactionForm',
    'dateTime',
  ];
  dataSource = new MatTableDataSource<ISummary>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _liveAnnouncer: LiveAnnouncer) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
}

export interface ISummary {
  position: number;
  iso: string;
  totalVolume: number;
  weightedAverageExchangeRate: string;
  transactionForm: string;
  dateTime: string;
}

const ELEMENT_DATA: ISummary[] = [
  {
    position: 1,
    iso: 'Hydrogen',
    totalVolume: 1.0079,
    weightedAverageExchangeRate: 'H',
    transactionForm: 'Transaction form',
    dateTime: 'Date/Time',
  },
  {
    position: 2,
    iso: 'Helium',
    totalVolume: 4.0026,
    weightedAverageExchangeRate: 'He',
    transactionForm: 'Transaction form',
    dateTime: 'Date/Time',
  },
  {
    position: 3,
    iso: 'Lithium',
    totalVolume: 6.941,
    weightedAverageExchangeRate: 'Li',
    transactionForm: 'Transaction form',
    dateTime: 'Date/Time',
  },
  {
    position: 4,
    iso: 'Beryllium',
    totalVolume: 9.0122,
    weightedAverageExchangeRate: 'Be',
    transactionForm: 'Transaction form',
    dateTime: 'Date/Time',
  },
  {
    position: 5,
    iso: 'Boron',
    totalVolume: 10.811,
    weightedAverageExchangeRate: 'B',
    transactionForm: 'Transaction form',
    dateTime: 'Date/Time',
  },
  {
    position: 6,
    iso: 'Carbon',
    totalVolume: 12.0107,
    weightedAverageExchangeRate: 'C',
    transactionForm: 'Transaction form',
    dateTime: 'Date/Time',
  },
  {
    position: 7,
    iso: 'Nitrogen',
    totalVolume: 14.0067,
    weightedAverageExchangeRate: 'N',
    transactionForm: 'Transaction form',
    dateTime: 'Date/Time',
  },
  {
    position: 8,
    iso: 'Oxygen',
    totalVolume: 15.9994,
    weightedAverageExchangeRate: 'O',
    transactionForm: 'Transaction form',
    dateTime: 'Date/Time',
  },
  {
    position: 9,
    iso: 'Fluorine',
    totalVolume: 18.9984,
    weightedAverageExchangeRate: 'F',
    transactionForm: 'Transaction form',
    dateTime: 'Date/Time',
  },
  {
    position: 10,
    iso: 'Neon',
    totalVolume: 20.1797,
    weightedAverageExchangeRate: 'Ne',
    transactionForm: 'Transaction form',
    dateTime: 'Date/Time',
  },
  {
    position: 11,
    iso: 'Sodium',
    totalVolume: 22.9897,
    weightedAverageExchangeRate: 'Na',
    transactionForm: 'Transaction form',
    dateTime: 'Date/Time',
  },
  {
    position: 12,
    iso: 'Magnesium',
    totalVolume: 24.305,
    weightedAverageExchangeRate: 'Mg',
    transactionForm: 'Transaction form',
    dateTime: 'Date/Time',
  },
  {
    position: 13,
    iso: 'Aluminum',
    totalVolume: 26.9815,
    weightedAverageExchangeRate: 'Al',
    transactionForm: 'Transaction form',
    dateTime: 'Date/Time',
  },
  {
    position: 14,
    iso: 'Silicon',
    totalVolume: 28.0855,
    weightedAverageExchangeRate: 'Si',
    transactionForm: 'Transaction form',
    dateTime: 'Date/Time',
  },
  {
    position: 15,
    iso: 'Phosphorus',
    totalVolume: 30.9738,
    weightedAverageExchangeRate: 'P',
    transactionForm: 'Transaction form',
    dateTime: 'Date/Time',
  },
  {
    position: 16,
    iso: 'Sulfur',
    totalVolume: 32.065,
    weightedAverageExchangeRate: 'S',
    transactionForm: 'Transaction form',
    dateTime: 'Date/Time',
  },
  {
    position: 17,
    iso: 'Chlorine',
    totalVolume: 35.453,
    weightedAverageExchangeRate: 'Cl',
    transactionForm: 'Transaction form',
    dateTime: 'Date/Time',
  },
  {
    position: 18,
    iso: 'Argon',
    totalVolume: 39.948,
    weightedAverageExchangeRate: 'Ar',
    transactionForm: 'Transaction form',
    dateTime: 'Date/Time',
  },
  {
    position: 19,
    iso: 'Potassium',
    totalVolume: 39.0983,
    weightedAverageExchangeRate: 'K',
    transactionForm: 'Transaction form',
    dateTime: 'Date/Time',
  },
  {
    position: 20,
    iso: 'Calcium',
    totalVolume: 40.078,
    weightedAverageExchangeRate: 'Ca',
    transactionForm: 'Transaction form',
    dateTime: 'Date/Time',
  },
];
