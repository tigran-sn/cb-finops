import { Injectable } from '@angular/core';
import { CustomSnackbarComponent } from "../components/custom-snackbar/custom-snackbar.component";
import { MatSnackBar } from "@angular/material/snack-bar";

type SnackBarType = 'success' | 'error' | 'warning';

@Injectable({
  providedIn: 'root'
})
export class CustomSnackbarService {
  private icon = 'done';
  private panelClass = 'success-snackbar';

  constructor(private _snackBar: MatSnackBar) {}

  openSnackbar(message: string, type: SnackBarType): void {
    this.setSnackbarIconAndPanelClass(type);
    this._snackBar.openFromComponent(CustomSnackbarComponent, {
      data: { message, snackBar: this._snackBar, icon: this.icon },
      // duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: this.panelClass
    });
  }

  private setSnackbarIconAndPanelClass(type: SnackBarType): void {
    const typeMappings: Record<SnackBarType, { icon: string; panelClass: string }> = {
      'success': { icon: 'done', panelClass: 'success-snackbar' },
      'error': { icon: 'report_problem', panelClass: 'error-snackbar' },
      'warning': { icon: 'warning', panelClass: 'warning-snackbar' },
    };

    const mapping = typeMappings[type];

    if (mapping) {
      this.icon = mapping.icon;
      this.panelClass = mapping.panelClass;
    }
  }
}
