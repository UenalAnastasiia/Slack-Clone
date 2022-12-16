import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Channel } from 'src/models/channel.class';
import { AppComponent } from '../../app.component';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { collection, addDoc } from '@firebase/firestore';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dialog-add-channel',
  templateUrl: './dialog-add-channel.component.html',
  styleUrls: ['./dialog-add-channel.component.scss']
})
export class DialogAddChannelComponent implements OnInit {
  channel = new Channel();

  constructor(
    private firestore: Firestore,
    private authService: AuthService,
    public dialogRef: MatDialogRef<DialogAddChannelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AppComponent,
  ) { }

  ngOnInit(): void {
  }


  async saveChannel() {
    const docRef = await addDoc(collection(this.firestore, "channels"), this.channel.toJSON());
    this.channel.id = docRef.id;
    this.channel.creator = this.authService.userName;
    await setDoc(doc(this.firestore, "channels", this.channel.id), this.channel.toJSON());
    this.dialogRef.close();
  }
}
