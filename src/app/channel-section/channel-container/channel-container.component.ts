import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { Channel } from 'src/models/channel.class';

@Component({
  selector: 'app-chanel-container',
  templateUrl: './channel-container.component.html',
  styleUrls: ['./channel-container.component.scss']
})
export class ChannelContainerComponent implements OnInit {
  channelID: any;
  channel: Channel = new Channel();
  channelData: any;


  constructor(private route: ActivatedRoute, private firestore: Firestore, public dialog: MatDialog) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.channelID = params.get('id');
    });

    this.getDocRef(this.channelID);
  }


  async getDocRef(id: string) {
    const docRef = doc(this.firestore, `channels/${id}`);
    const snapDoc = await getDoc(docRef);
    this.channelData = snapDoc.data();
    this.channel = new Channel(this.channelData);
    this.channel.id = this.channelID;


    console.log('Current Channel-Name: ', this.channel.name)
    console.log('Current Channel-Description: ', this.channel.description)
  }

}
