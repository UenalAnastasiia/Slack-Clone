import { Component, OnInit } from '@angular/core';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Channel } from 'src/models/channel.class';

@Component({
  selector: 'app-dialog-edit-channel',
  templateUrl: './dialog-edit-channel.component.html',
  styleUrls: ['./dialog-edit-channel.component.scss']
})
export class DialogEditChannelComponent implements OnInit {
  channel: Channel;
  channelID: string;
  loadProgress: boolean = false


  constructor(public dialogRef: MatDialogRef<DialogEditChannelComponent>, private firestore: Firestore, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(params => {
      this.channelID = params.get('id');
    });
  }


  async saveChannel() {
    await setDoc(doc(this.firestore, "channels", this.channel.id), this.channel.toJSON());
    this.loadProgress = true;
    this.closeDialog();
    this.reloadChannelData();
  }


  closeDialog() {
    setTimeout(() => {
      this.loadProgress = false;
      this.dialogRef.close();
    }, 1500);
  }


  reloadChannelData() {
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  }
}
