import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../../../modules/admin/components/popup/popup.component';
import { PopupDialogData } from '../../../modules/admin/components/popup/model/popup-dialog-data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor(private dialog: MatDialog) { }

  popupDialog(data: PopupDialogData) : Observable<boolean> {
    return this.dialog.open(PopupComponent, {
      data,
      width: "400px",
      disableClose: true,
      enterAnimationDuration: "220ms",
      exitAnimationDuration: "100ms"
    }).afterClosed();
  }
}
