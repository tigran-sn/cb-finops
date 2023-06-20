import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import {ValidationMessages, Messages} from "../../../../core/infrastructure/interfaces";
import {IntegerValidator, MaxCharacterValidator, RateFormatValidator} from "../../../../shared/validators";
import {appSettings} from "../../../../app.settings";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  submitted: boolean;
  validationMessages: ValidationMessages = {};
  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    this.getValidationMessages();
  }

  get dealId(): FormControl {
    return this.form.get('dealId') as FormControl;
  }

  get participant(): FormControl {
    return this.form.get('participant') as FormControl;
  }

  get dealType(): FormControl {
    return this.form.get('dealType') as FormControl;
  }

  get partner(): FormControl {
    return this.form.get('partner') as FormControl;
  }

  get dealDate(): FormControl {
    return this.form.get('dealDate') as FormControl;
  }

  get calculationDate(): FormControl {
    return this.form.get('calculationDate') as FormControl;
  }

  get isocode(): FormControl {
    return this.form.get('isocode') as FormControl;
  }

  get volume(): FormControl {
    return this.form.get('volume') as FormControl;
  }

  get rate(): FormControl {
    return this.form.get('rate') as FormControl;
  }

  private initForm(): void {
    this.form = this.fb.group({
      dealId: ['', Validators.required],
      participant: ['', Validators.required],
      dealType: ['', Validators.required],
      partner: ['', Validators.required],
      dealDate: [null, Validators.required],
      // dealTime: [null, Validators.required],
      calculationDate: [null, Validators.required],
      isocode: ['', Validators.required],
      volume: ['',
        Validators.compose([
          Validators.required,
          MaxCharacterValidator.validate(appSettings.reports.volume),
          IntegerValidator.validate(),
        ])
      ],
      rate: ['', Validators.compose([
        Validators.required,
        RateFormatValidator.validate(),
      ])],
    });
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
    this.validationMessages.calculationDate = [
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

  onRegister(): void {
    this.submitted = true;
    // console.log(this.form.value);
    if (this.form.valid) {
      // Process the form data here
      console.log(this.form.value);
    }
  }

  onSend(): void {
    this.submitted = true;
    // console.log(this.form.value);
    if (this.form.valid) {
      // Process the form data here
      console.log(this.form.value);
    }
  }

  onDateSelected(event: MatDatepickerInputEvent<Date>): void {
    // Handle datepicker selection here
    console.log(event.value);
  }

  dealDateChange(type: string, event: any): void {
    this.dealDate.setValue(event.value);
  }

  calculationDateChange(type: string, event: any): void {
    this.calculationDate.setValue(event.value);
  }
}
