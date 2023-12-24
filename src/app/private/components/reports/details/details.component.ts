import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  IPartner,
  IResponse,
  Messages,
  ValidationMessages,
} from '../../../../core/infrastructure/interfaces';
import {
  IntegerValidator,
  MaxCharacterValidator,
  RateFormatValidator,
} from '../../../../shared/validators';
import { appSettings } from '../../../../app.settings';
import { State, Store } from '../../../../shared/store';
import { Observable, Subject, takeUntil, throwError } from 'rxjs';
import { ReportsService } from '../../../services';
import {
  LookUpModel,
  ReportsLookupModel,
} from '../../../../core/infrastructure/models';
import { catchError, map } from 'rxjs/operators';
import { LookupsService } from '../../../services/lookups/lookups.service';
import { Router } from '@angular/router';
import { Urls } from '../../../../core/infrastructure/enums';
import { CustomSnackbarService } from 'src/app/shared/services';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  submitted: boolean;
  validationMessages: ValidationMessages = {};
  form: FormGroup;
  bankId: string;
  partners: IPartner[];
  dealTypes: Array<LookUpModel> = [];
  isocodes: Array<LookUpModel> = [];
  isSend = false;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private store: Store<State>,
    private reportsService: ReportsService,
    private lookupsService: LookupsService,
    private router: Router,
    private customSnackbarService: CustomSnackbarService
  ) {}

  ngOnInit(): void {
    this.getLookUps().subscribe();
    this.store
      .select((state: State) => state.userClaims)
      .pipe(takeUntil(this.destroy$))
      .subscribe((userClaims) => {
        if (userClaims) {
          this.bankId = userClaims.bankId;
        }
      });
    this.reportsService
      .getPartnersList()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (res.success) {
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
      participant: [this.bankId],
      dealType: ['', Validators.required],
      partner: ['', Validators.required],
      dealDate: [null, Validators.required],
      isocode: ['', Validators.required],
      volume: [
        '',
        Validators.compose([
          Validators.required,
          MaxCharacterValidator.validate(appSettings.reports.volume),
          IntegerValidator.validate(),
        ]),
      ],
      rate: [
        '',
        Validators.compose([
          Validators.required,
          RateFormatValidator.validate(),
        ]),
      ],
    });
  }

  private getValidationMessages(): void {
    this.validationMessages.participant = [
      { type: 'required', message: Messages.required },
    ];
    this.validationMessages.dealType = [
      { type: 'required', message: Messages.required },
    ];
    this.validationMessages.partner = [
      { type: 'required', message: Messages.required },
    ];
    this.validationMessages.dealDate = [
      { type: 'required', message: Messages.required },
    ];
    this.validationMessages.isocode = [
      { type: 'required', message: Messages.required },
    ];
    this.validationMessages.volume = [
      { type: 'required', message: Messages.required },
      {
        type: 'maxLength',
        message: Messages.validateMaxCharacterMessage(
          appSettings.reports.volume
        ),
      },
      { type: 'integersOnly', message: Messages.integersOnly },
    ];
    this.validationMessages.rate = [
      { type: 'required', message: Messages.required },
      { type: 'rateFormat', message: Messages.rateFormat },
    ];
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
    );
  }

  private createReport() {
    this.store.update({ showLoader: true });
    if (this.form.valid) {
      this.submitted = true;
      const reportModel = {
        dealType: this.dealType.value,
        partner: this.partner.value,
        isocode: this.isocode.value,
        volume: this.volume.value,
        rate: this.rate.value,
        dealDate: this.dealDate.value,
        isSend: this.isSend,
      };
      this.reportsService
        .createReport(reportModel)
        .pipe(
          catchError((err) => {
            this.customSnackbarService.openSnackbar(err.error.message, 'error');
            this.store.update({ showLoader: false });
            return throwError(err);
          })
        )
        .subscribe((res) => {
          if (this.isSend) {
            this.router.navigate([`./${Urls.Reports}/${Urls.SentReports}`]);
          } else {
            this.router.navigate([`./${Urls.Reports}/${Urls.FilledReports}`]);
          }
          this.store.update({ showLoader: false });
        });
    }
  }

  onRegister(): void {
    this.isSend = false;
    this.createReport();
  }

  onSend(): void {
    this.isSend = true;
    this.createReport();
  }
}
