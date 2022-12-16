import { Component, OnInit } from '@angular/core';
import { doc, Firestore } from '@angular/fire/firestore';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { deleteDoc } from 'firebase/firestore';
import { AuthService } from 'src/app/services/auth.service';
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

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';


  constructor(
    public dialogRef: MatDialogRef<DialogChannelDetailsComponent>, 
    public dialog: MatDialog, 
    private activeRoute: ActivatedRoute, 
    private firestore: Firestore, 
    private messageTipp: MatSnackBar,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(params => {
      this.channelID = params.get('id');
    });
  }


  openDialogEdit() {
    if (this.authService.userName == this.channel.creator) {
      const dialog = this.dialog.open(DialogEditChannelComponent);
      dialog.componentInstance.channel = new Channel(this.channel.toJSON());
      dialog.componentInstance.channel.id = this.channel.id;
    } else {
      this.showSnackMessage('Just creator can edit this channel!');
    }
  }


  async deleteChannel() {
    if (this.authService.userName == this.channel.creator) {
      await deleteDoc(doc(this.firestore, "channels", this.channel.id));
      location.reload();
      this.showSnackMessage('Channel deleted!');
    } else {
      this.showSnackMessage('Just creator can delete this channel!');
    }
  }


  showSnackMessage(text: string) {
    this.messageTipp.open(` ${text} `, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 1000
    });
  }
}
