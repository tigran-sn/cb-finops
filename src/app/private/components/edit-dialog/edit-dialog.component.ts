import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { RequiredValidator } from "../../../shared/validators";

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
})
export class EditDialogComponent implements OnInit {
  form: FormGroup;
  controls: any;
  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.form = this.fb.group({
      reportName: [this.data.item.reportName, Validators.compose([
        RequiredValidator.validate,
        Validators.maxLength(250),
      ])],
    });
    this.setControls();
  }

  private setControls(): void {
    this.controls = {
      reportName: this.form.get('reportName') as FormControl,
    };
  }

  save(): void {
    if (this.form.valid) {
      const editedData = { ...this.data.item, ...this.form.value };
      this.dialogRef.close(editedData);
    }
  }
}
