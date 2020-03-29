import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SpinnerComponent } from '../components/common/ui/spinner/spinner.component';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private dialogRef;
  constructor(public dialog: MatDialog) { }

  public show(text?: string) {
    this.dialogRef = this.dialog.open(SpinnerComponent, {
      width: '200px',
      height: '150px',
      disableClose: true,
      data: text
    });
  }

  public hide() {
    this.dialogRef.close();
  }


}
