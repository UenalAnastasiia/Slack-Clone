import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Channel } from 'src/models/channel.class';

@Component({
  selector: 'app-dialog-channel-details',
  templateUrl: './dialog-channel-details.component.html',
  styleUrls: ['./dialog-channel-details.component.scss']
})
export class DialogChannelDetailsComponent implements OnInit {
  channel: Channel;
  constructor(public dialogRef: MatDialogRef<DialogChannelDetailsComponent>) { }

  ngOnInit(): void {
  }


  openDialogEdit() {
    
  }

}
