import { Component, OnInit } from '@angular/core';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Channel } from 'src/models/channel.class';
import { DialogEditChannelComponent } from '../dialog-edit-channel/dialog-edit-channel.component';

@Component({
  selector: 'app-dialog-channel-details',
  templateUrl: './dialog-channel-details.component.html',
  styleUrls: ['./dialog-channel-details.component.scss']
})
export class DialogChannelDetailsComponent implements OnInit {
  channel: Channel;
  channelID: any;


  constructor(public dialogRef: MatDialogRef<DialogChannelDetailsComponent>, public dialog: MatDialog, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(params => {
      this.channelID = params.get('id');
    });
  }


  openDialogEdit() {
    const dialog = this.dialog.open(DialogEditChannelComponent);
    dialog.componentInstance.channel = new Channel(this.channel.toJSON());
    dialog.componentInstance.channel.id = this.channel.id;
  }
}
