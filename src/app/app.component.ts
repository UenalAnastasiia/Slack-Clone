import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { Channel } from 'src/models/channel.class';
import { DialogAddChannelComponent } from './channel-section/dialog-add-channel/dialog-add-channel.component';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';


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


  constructor(public dialog: MatDialog, private firestore: Firestore, private authService: AuthService, private router: Router) { }


  /**
   * Load Channel-Data from Firebase 
   */
  ngOnInit(): void {
    const channelCollection = collection(this.firestore, 'channels');
    this.allChannels$ = collectionData(channelCollection, { idField: "channelID" });

    this.allChannels$.subscribe((data: any) => {
      this.allChannels = data;
    });
  }


  onClick() {
    this.authService.logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(error => console.log(error));
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
    const dialog = this.dialog.open(DialogAddChannelComponent); 
    dialog.componentInstance.channel = new Channel(this.channel.toJSON());
  }
}
