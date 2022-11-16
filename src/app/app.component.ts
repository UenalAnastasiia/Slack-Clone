import { Component, ViewChild, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { DialogAddChannelComponent } from './dialog-add-channel/dialog-add-channel.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('sidenav') sidenav: MatSidenav;
  isExpandedAddBtn: boolean = false;
  isExpandedDM: boolean = false;
  showSubmenu: boolean = true;
  showDMmenu: boolean = true;
  isShowingAddBtn: boolean = false;
  isShowingDM: boolean = false;

  channelName: string;
  name: string;

  constructor(public dialog: MatDialog) { }


  showAddBtn() {
    if (!this.isExpandedAddBtn) {
      this.isShowingAddBtn = true;
    }
  }


  hideAddBtn() {
    if (!this.isExpandedAddBtn) {
      this.isShowingAddBtn = false;
    }
  }


  showDMbtn() {
    if (!this.isExpandedDM) {
      this.isShowingDM = true;
    }
  }


  hideDMbtn() {
    if (!this.isExpandedDM) {
      this.isShowingDM = false;
    }
  }


  openDialogAddChannel(): void {
    const dialogRef = this.dialog.open(DialogAddChannelComponent, {
      width: '250px',
      data: { name: this.name, channelName: this.channelName },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog Name: ', result);
      this.channelName = '# ' + result;
    });
  }
}
