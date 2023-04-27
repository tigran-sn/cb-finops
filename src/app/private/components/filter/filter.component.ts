// TODO Continue Filter implementation
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';

import { TransactionType } from '../../enums';
import { ITransactionType } from '../../interfaces';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  form: FormGroup;
  controls: { transactionType: AbstractControl; range: AbstractControl };
  transactionType = new FormControl<TransactionType | null>(null);
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.form = this._formBuilder.group({
      transactionType: this.transactionType,
      range: this.range,
    });
    this.setControls();
  }

  private setControls() {
    this.controls = {
      transactionType: this.form.get('transactionType') as FormControl,
      range: this.form.get('range') as FormGroup,
    };
  }

  onSelectChange(event: any) {
    console.log(this.form);
  }

  applyFilter(): void {
    console.log(this.form);
  }

  resetFilter(): void {
    this.form.reset();
    this.setControls();
    console.log(this.form);
  }

  get dateRange(): string {
    return this.form.get('range')?.value;
  }

  get transactionTypeValue(): string {
    return this.form.get('transactionType')?.value;
  }

  transactionTypes: ITransactionType[] = [
    {
      value: TransactionType.CASH_PURCHASE,
      viewValue: 'Cash currency purchase',
    },
    {
      value: TransactionType.CACHLESS_PURCHASE,
      viewValue: 'Cashless currency purchase',
    },
    { value: TransactionType.CASH_SALES, viewValue: 'Cash currency sales' },
    {
      value: TransactionType.CASHLESS_SALES,
      viewValue: 'Cashless currency sales',
    },
  ];
}
