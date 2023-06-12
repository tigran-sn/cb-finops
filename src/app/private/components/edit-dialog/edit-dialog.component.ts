import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RequiredValidator } from '../../../shared/validators';
import {IResponse, ValidationMessages} from 'src/app/core/infrastructure/interfaces';
import {Observable} from "rxjs";
import {LookUpModel, ReportsLookupModel} from "../../../core/infrastructure/models";
import {map} from "rxjs/operators";
import {LookupsService} from "../../services/lookups/lookups.service";

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
})
export class EditDialogComponent implements OnInit {
  form: FormGroup;
  controls: any;
  submitted: boolean;
  validationMessages: ValidationMessages = {};
  dealTypes: Array<LookUpModel> = [];
  isocodes: Array<LookUpModel> = [];
  statuses: Array<LookUpModel> = [];

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    private fb: FormBuilder,
    private lookupsService: LookupsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
    this.getLookUps().subscribe();
    this.initForm();
  }

  private initForm() {
    this.form = this.fb.group({
      // reportName: [this.data.item.reportName, Validators.compose([
      //   RequiredValidator.validate,
      //   Validators.maxLength(250),
      // ])],
      dealId: [{ value: this.data.item.dealId, disabled: true }, Validators.required],
      participant: [{ value: this.data.item.participant, disabled: true }, Validators.required],
      dealType: [this.data.item.dealType, Validators.required],
      partner: [this.data.item.partner, Validators.required],
      dealDate: [this.data.item.dealDate, Validators.required],
      // dealTime: [null, Validators.required],
      calculationDate: [this.data.item.calculationDate, Validators.required],
      isocode: [this.data.item.isocode, Validators.required],
      volume: [this.data.item.volume, Validators.required],
      rate: [this.data.item.rate, Validators.required],
    });
    this.setControls();
  }

  private setControls(): void {
    this.controls = {
      dealId: this.form.get('dealId'),
      participant: this.form.get('participant'),
      dealType: this.form.get('dealType'),
      partner: this.form.get('partner'),
      dealDate: this.form.get('dealDate'),
      calculationDate: this.form.get('calculationDate'),
      isocode: this.form.get('isocode'),
      volume: this.form.get('volume'),
      rate: this.form.get('rate'),
    };
  }

  private getLookUps(): Observable<IResponse<ReportsLookupModel>> {
    return this.lookupsService.getLookUps().pipe(
      map((res: IResponse<ReportsLookupModel>) => {
        if (res.success) {
          this.dealTypes = res.data.dealTypes;
          this.isocodes = res.data.isocodes;
        }
        return res;
      })
    )
  }

  save(): void {
    if (this.form.valid) {
      const editedData = { ...this.data.item, ...this.form.value };
      this.dialogRef.close(editedData);
    }
  }
}
