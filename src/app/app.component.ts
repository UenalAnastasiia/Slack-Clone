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
import { DialogCreateChatComponent } from './direct-messages-section/dialog-create-chat/dialog-create-chat.component';
import { Chat } from 'src/models/chat.class';


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
  chat: Chat;

  allChats$: Observable<any>;
  allChats = [];

  auth: boolean = true;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';


  constructor(public dialog: MatDialog, private firestore: Firestore, public authService: AuthService, private messageTipp: MatSnackBar) {
    this.authService.getLoggedUser();
  }


  ngOnInit(): void {
    this.checkURL();
    this.loadChannelMenu();
  }


  checkURL() {
    if (window.location.href.includes('channel') || window.location.href.includes('register') || window.location.href.includes('chat')) {
      this.auth = false;
      this.loadUserChats();
    }
  }


  /**
   * Load Channel-Data from Firebase 
   */
  loadChannelMenu() {
    const channelCollection = collection(this.firestore, 'channels');
    this.allChannels$ = collectionData(channelCollection, { idField: "channelID" });

    this.allChannels$.subscribe((data: any) => {
      this.allChannels = data;
    });
  }


  loadUserChats() {
    const chatCollection = collection(this.firestore, 'chats');
    this.allChats$ = collectionData(chatCollection, {});

    this.allChats$.subscribe((data: any) => {
      const auth = getAuth();
      const user = auth.currentUser;

      for (let i = 0; i < data.length; i++) {
        if (data[i].firstUser == user.displayName || data[i].secondUser == user.displayName) {
          let userChats = data[i];
          this.allChats.push(userChats);
        }
      }
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


  openDialogCreateChat() {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user.displayName !== null) {
      this.dialog.open(DialogCreateChatComponent);
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


  showMessage() {
    this.messageTipp.open('Not available for Guest!', '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 1000
    });
  }
}