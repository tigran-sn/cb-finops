import { Component, Inject, HostListener } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IConfirmDialogData } from '../../interfaces';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [MatIconModule,MatDialogModule,MatButtonModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
  @HostListener('window:keyup.esc') onKeyUp() {
    this.dialogRef.close();
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IConfirmDialogData,
    private dialogRef: MatDialogRef<ConfirmDialogComponent>
  ) {
    dialogRef.disableClose = true;
    dialogRef.backdropClick().subscribe(() => {
      dialogRef.close();
    });
  }

}
