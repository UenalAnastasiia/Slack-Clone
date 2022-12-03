import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { Channel } from 'src/models/channel.class';
import { Thread } from 'src/models/thread.class';
import { collection, addDoc } from '@firebase/firestore';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';


@Component({
  selector: 'app-add-thread',
  templateUrl: './add-thread.component.html',
  styleUrls: ['./add-thread.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddThreadComponent implements OnInit {
  channel: Channel = new Channel();
  channelData: any;

  thread = new Thread();
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['fontName', 'fontSize', 'justifyLeft', 'justifyRight', 'justifyFull', 'indent', 'outdent']
    ]
  };


  constructor(private activeRoute: ActivatedRoute, private firestore: Firestore, private messageTipp: MatSnackBar) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(routeParams => {
      this.getDocRef(routeParams['id']);
    });
  }


  async getDocRef(id: string) {
    const docRef = doc(this.firestore, `channels/${id}`);
    const snapDoc = await getDoc(docRef);
    this.channelData = snapDoc.data();
    this.channel = new Channel(this.channelData);
    this.thread.channelID = this.channel.id;
  }


  onKeypressEvent(event: any) {
    if (event.keyCode == 13) {
      event.preventDefault();
      this.sendThread();
    }
  }


  sendThread() {
    if (this.thread.message == '') {
      this.showMessageTipp();
    } else {
      this.saveThread();
    }
  }


  showMessageTipp() {
    this.messageTipp.open('Please write a message!', '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 1000
    });
  }


  async saveThread() {
    let dateTime = new Date();
    const docRef = await addDoc(collection(this.firestore, "threads"), this.thread.toJSON())
    this.thread.id = docRef.id;
    this.thread.sendDateTime = dateTime.toISOString();
    await setDoc(doc(this.firestore, "threads", this.thread.id), this.thread.toJSON());
    this.thread.message = '';
  }
}