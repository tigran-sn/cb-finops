import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

import { Observable, first, map } from 'rxjs';

import { IResponse } from 'src/app/core/infrastructure/interfaces';
import {
  FilterModel,
  ReportsLookupModel,
} from 'src/app/core/infrastructure/models';
import { IDealType } from 'src/app/private/interfaces';
import { LookupsService } from 'src/app/private/services/lookups/lookups.service';

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.scss'],
})
export class FilterFormComponent implements OnInit {
  @Output() filterApplied = new EventEmitter<any>();
  @Output() filterReset = new EventEmitter<void>();

  form: FormGroup;
  controls: FilterModel;
  dealType = new FormControl();
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  dealTypes: IDealType[];
  language: string;

  constructor(
    private fb: FormBuilder,
    private lookupsService: LookupsService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.getLookUps().pipe(first()).subscribe();
    this.initForm();
  }

  applyFilter(): void {
    this.filterApplied.emit({
      dealType: this.form.get('dealType')?.value,
      range: {
        start: this.datePipe.transform(
          this.form.get('range')?.get('start')?.value,
          'dd-MM-yyyy'
        ),
        end: this.datePipe.transform(
          this.form.get('range')?.get('end')?.value,
          'dd-MM-yyyy'
        ),
      },
    });
  }

  resetFilter(): void {
    this.form.reset();
    this.setControls();
    this.filterReset.emit();
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
}
