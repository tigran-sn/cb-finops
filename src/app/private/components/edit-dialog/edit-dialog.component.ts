import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  IntegerValidator,
  MaxCharacterValidator,
  RateFormatValidator,
} from '../../../shared/validators';
import {IPartner, IResponse, Messages, ValidationMessages} from 'src/app/core/infrastructure/interfaces';
import {Observable, Subject, takeUntil} from "rxjs";
import {LookUpModel, ReportsLookupModel} from "../../../core/infrastructure/models";
import {map} from "rxjs/operators";
import {LookupsService} from "../../services/lookups/lookups.service";
import {appSettings} from "../../../app.settings";
import {ReportsService} from "../../services";

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
})
export class EditDialogComponent implements OnInit, OnDestroy {
  form: FormGroup;
  controls: any;
  submitted: boolean;
  validationMessages: ValidationMessages = {};
  dealTypes: Array<LookUpModel> = [];
  isocodes: Array<LookUpModel> = [];
  partners: IPartner[];
  statuses: Array<LookUpModel> = [];

  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    private fb: FormBuilder,
    private lookupsService: LookupsService,
    private reportsService: ReportsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
    this.getLookUps().subscribe();
    this.reportsService.getPartnersList()
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        if(res.success) {
          this.partners = res.data.listItems;
        }
      });
    this.initForm();
    this.getValidationMessages();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initForm() {
    this.form = this.fb.group({
      dealId: [{ value: this.data.item.dealId, disabled: true }, Validators.required],
      participant: [{ value: this.data.item.participant, disabled: true }, Validators.required],
      dealType: [this.data.item.dealType, Validators.required],
      partner: [this.data.item.partner, Validators.required],
      dealDate: [this.data.item.dealDate, Validators.required],
      isocode: [this.data.item.isocode, Validators.required],
      volume: [this.data.item.volume,
        Validators.compose([
          Validators.required,
          MaxCharacterValidator.validate(appSettings.reports.volume),
          IntegerValidator.validate(),
        ])
      ],
      rate: [this.data.item.rate, Validators.compose([
        Validators.required,
        RateFormatValidator.validate(),
      ])],
    });
    this.setControls();
  }

  private setControls(): void {
    this.controls = {
      dealId: this.form.get('dealId') as FormControl,
      participant: this.form.get('participant') as FormControl,
      dealType: this.form.get('dealType') as FormControl,
      partner: this.form.get('partner') as FormControl,
      dealDate: this.form.get('dealDate') as FormControl,
      isocode: this.form.get('isocode') as FormControl,
      volume: this.form.get('volume') as FormControl,
      rate: this.form.get('rate') as FormControl,
    };
  }

  private getValidationMessages(): void {
    this.validationMessages.dealId = [
      { type: 'required', message: Messages.required },
    ]
    this.validationMessages.participant = [
      { type: 'required', message: Messages.required },
    ]
    this.validationMessages.dealType = [
      { type: 'required', message: Messages.required },
    ]
    this.validationMessages.partner = [
      { type: 'required', message: Messages.required },
    ]
    this.validationMessages.dealDate = [
      { type: 'required', message: Messages.required },
    ]
    this.validationMessages.isocode = [
      { type: 'required', message: Messages.required },
    ]
    this.validationMessages.volume = [
      { type: 'required', message: Messages.required },
      { type: 'maxLength', message: Messages.validateMaxCharacterMessage(appSettings.reports.volume) },
      { type: 'integersOnly', message: Messages.integersOnly },
    ]
    this.validationMessages.rate = [
      { type: 'required', message: Messages.required },
      { type: 'rateFormat', message: Messages.rateFormat },
    ]
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
