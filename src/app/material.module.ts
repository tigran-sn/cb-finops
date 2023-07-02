import { NgModule } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';

import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  // NgxMatTimepickerModule,
} from '@angular-material-components/datetime-picker';

import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';

const matModules = [
  MatSlideToggleModule,
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatFormFieldModule,
  MatToolbarModule,
  MatIconModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatRadioModule,
  MatSelectModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatMenuModule,
  MatSnackBarModule,

  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  // NgxMatTimepickerModule,

  NgxMatTimepickerModule,
];

const armRangeLabel = (page: number, pageSize: number, length: number) => {
  if (length == 0 || pageSize == 0) {
    return `0 van ${length}`;
  }

  length = Math.max(length, 0);

  const startIndex = page * pageSize;

  // If the start index exceeds the list length, do not try and fix the end index to the end.
  const endIndex =
    startIndex < length
      ? Math.min(startIndex + pageSize, length)
      : startIndex + pageSize;

  return `${startIndex + 1} - ${endIndex} ${length}-ից`;
};

function getArmPaginatorIntl() {
  const paginatorIntl = new MatPaginatorIntl();

  paginatorIntl.itemsPerPageLabel = 'Նյութ մեկ էջում:';
  paginatorIntl.nextPageLabel = 'Հաջորդ էջ';
  paginatorIntl.lastPageLabel = 'Վերջին էջ';
  paginatorIntl.previousPageLabel = 'Նախորդ էջ';
  paginatorIntl.firstPageLabel = 'Առաջին էջ';
  paginatorIntl.getRangeLabel = armRangeLabel;

  return paginatorIntl;
}

@NgModule({
  imports: matModules,
  declarations: [],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: MatPaginatorIntl, useValue: getArmPaginatorIntl() }
  ],
  exports: matModules,
})
export class MaterialModule {}
