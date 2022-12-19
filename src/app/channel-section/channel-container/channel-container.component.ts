import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Firestore, doc, getDoc, collectionData } from '@angular/fire/firestore';
import { Channel } from 'src/models/channel.class';
import { DialogChannelDetailsComponent } from 'src/app/channel-section/dialog-channel-details/dialog-channel-details.component';
import { collection } from 'firebase/firestore';
import { ShareService } from 'src/app/services/share.service';

@Component({
  selector: 'app-channel-container',
  templateUrl: './channel-container.component.html',
  styleUrls: ['./channel-container.component.scss']
})
export class ChannelContainerComponent implements OnInit {
  channelID: string;
  channel: Channel = new Channel();
  channelData: any;
  allUsers = [];
  userLength: number;
  showMembers: boolean = false;
  
  @Output() threadShow = new EventEmitter<boolean>();
  showDetails: boolean;


  constructor(private activeRoute: ActivatedRoute, private firestore: Firestore, public dialog: MatDialog, public shared: ShareService) { }


  ngOnInit(): void {
    this.getUserLength();
    this.activeRoute.paramMap.subscribe(params => {
      this.channelID = params.get('id');
      this.showDetails = false;
    });

    this.activeRoute.params.subscribe(routeParams => {
      this.getDocRef(routeParams['id']);
    });
  }


  async getDocRef(id: string) {
    const docRef = doc(this.firestore, `channels/${id}`);
    const snapDoc = await getDoc(docRef);
    this.channelData = snapDoc.data();
    this.channel = new Channel(this.channelData);
    this.channel.id = this.channelID;
    localStorage.setItem('ChannelID', JSON.stringify(this.channel.id));
  }


  openChannelDetails() {
    const dialog = this.dialog.open(DialogChannelDetailsComponent);
    dialog.componentInstance.channel = new Channel(this.channel.toJSON());
    dialog.componentInstance.channel.id = this.channelID;
  }


  closeDetails() {
    this.showDetails = !this.showDetails;
    this.threadShow.emit(this.showDetails);
  }


  getUserLength() {
    const userCollection = collection(this.firestore, 'users');
    let allusers$ = collectionData(userCollection);

    allusers$.subscribe((data: any) => {
      this.allUsers = data;
      this.userLength = data.length;
    });
  }
}