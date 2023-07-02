import {Injectable} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(
    private readonly snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  success(message: string): void {
    this.openSnackBar(message, '', 'success-snackbar');
  }

  error(message: string): void {
    this.openSnackBar(message, '', 'error-snackbar');
  }

  private openSnackBar(
    message: string,
    action: string,
    className = '',
    duration = 2500
  ): void {
    this.snackBar.open(message, action, {
      duration: duration,
      panelClass: [className]
    });
  }
}
