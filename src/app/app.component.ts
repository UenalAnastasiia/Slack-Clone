import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { Channel } from 'src/models/channel.class';
import { DialogAddChannelComponent } from './channel-section/dialog-add-channel/dialog-add-channel.component';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { AuthService } from './services/auth.service';
import { DialogEditUserComponent } from './dialog-edit-user/dialog-edit-user.component';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { getAuth } from 'firebase/auth';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;

  isExpandedAddBtn: boolean = false;
  isExpandedDM: boolean = false;
  showSubmenu: boolean = true;
  showDMmenu: boolean = true;
  isShowingAddBtn: boolean = false;
  isShowingDM: boolean = false;

  channel = new Channel();
  allChannels$: Observable<any>;
  allChannels: any = [];
  channnelID: string;

  auth: boolean = true;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';


  constructor(public dialog: MatDialog, private firestore: Firestore, public authService: AuthService, private messageTipp: MatSnackBar) {
    this.authService.getLoggedUser();
  }


  /**
   * Load Channel-Data from Firebase 
   */
  ngOnInit(): void {
    this.checkURL();

    const channelCollection = collection(this.firestore, 'channels');
    this.allChannels$ = collectionData(channelCollection, { idField: "channelID" });

    this.allChannels$.subscribe((data: any) => {
      this.allChannels = data;
    });
  }


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


  openDialogAddChannel() {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user.displayName !== null) {
      const dialog = this.dialog.open(DialogAddChannelComponent);
      dialog.componentInstance.channel = new Channel(this.channel.toJSON());
    } else {
      this.showMessage();
    }
  }


  openDialogEditUser() {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user.displayName !== null) {
      this.dialog.open(DialogEditUserComponent);
    } else {
      this.showMessage();
    }
  }


  logOut() {
    this.authService.logout()
      .then(() => {
        localStorage.removeItem('ThreadID');
        window.location.href = '/login';
      })
      .catch(error => console.log(error));
  }


  checkURL() {
    if (window.location.href.includes('channel') || window.location.href.includes('register')) {
      this.auth = false;
    }
  }


  showMessage() {
    this.messageTipp.open('Not available for Guest!', '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 1000
    });
  }


  getUsers() {
    const auth = getAuth();
    console.log(auth)
  }
}