// TODO Continue Filter implementation
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { DatePipe } from '@angular/common';

import { dealType } from '../../../private/enums';
import { IDealType } from '../../../private/interfaces';
import { LanguageService } from 'src/app/core/services';
import {FilterModel, ReportsLookupModel} from "../../../core/infrastructure/models";
import {Observable} from "rxjs";
import {IResponse} from "../../../core/infrastructure/interfaces";
import {map} from "rxjs/operators";
import {LookupsService} from "../../../private/services/lookups/lookups.service";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  @Output() filter = new EventEmitter<any>();
  form: FormGroup;
  controls: FilterModel;
  dealType = new FormControl<dealType | null>(null);
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  dealTypes: IDealType[];
  language: string;

  constructor(
    private fb: FormBuilder,
    private languageService: LanguageService,
    private lookupsService: LookupsService,
    private datePipe: DatePipe,
  ) {}

  ngOnInit(): void {
    this.languageService.currentLanguage.subscribe(
      (lang) => (this.language = lang)
    );
    // this.languageService.setLanguage('hy');
    this.getLookUps().subscribe();
    this.initForm();
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
    )
  }

  private emitFilter(): void {
    this.filter.emit({
      dealType: this.dealTypeValue.value,
      range: {
        start: this.datePipe.transform(this.dateRange?.get('start')?.value, 'dd-MM-yyyy'),
        end: this.datePipe.transform(this.dateRange?.get('end')?.value, 'dd-MM-yyyy'),
      }
    });
  }

  onSelectChange(event: any) {
    console.log(this.form);
  }

  applyFilter(): void {
    this.emitFilter();
  }

  resetFilter(): void {
    this.form.reset();
    this.setControls();
    this.emitFilter();
  }

  get dateRange(): FormControl {
    return this.form.get('range') as FormControl;
  }

  get dealTypeValue(): FormControl {
    return this.form.get('dealType') as FormControl;
  }
}
