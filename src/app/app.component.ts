import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('sidenav') sidenav: MatSidenav;
  isExpandedAddBtn: boolean = false;
  isExpandedDM: boolean = false;
  showSubmenu: boolean = false;
  showDMmenu: boolean = false;
  isShowingAddBtn : boolean = false;
  isShowingDM: boolean = false;


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
}
