import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { Channel } from 'src/models/channel.class';
import { Thread } from 'src/models/thread.class';
import { collection, addDoc } from '@firebase/firestore';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-thread-comment',
  templateUrl: './add-thread-comment.component.html',
  styleUrls: ['./add-thread-comment.component.scss']
})
export class AddThreadCommentComponent implements OnInit {
  channel: Channel = new Channel();
  channelData: any;

  detailsID: any;

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
    this.detailsID = JSON.parse(localStorage.getItem('ThreadID'));
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
      this.sendComment();
    }
  }


  sendComment() {
    if (this.thread.commentMessage == '') {
      this.showMessageTipp();
    } else {
      this.saveComment();
    }
  }


  showMessageTipp() {
    this.messageTipp.open('Please write a message!', '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 1000
    });
  }


  async saveComment() {
    let dateTime = new Date();
    const collRef = collection(this.firestore, "threads", this.detailsID, "threadComment");
    const dataRef = await addDoc(collRef, {
      threadComment: this.thread.commentMessage
    });
    this.thread.commentID = dataRef.id;
    this.thread.commentDateTime = dateTime.toISOString();
    await setDoc(doc(this.firestore, "threads", this.detailsID, "threadComment", this.thread.commentID), this.thread.toJSON());
    console.log('Comment: ', this.thread.commentMessage)
    this.thread.commentMessage = '';
  }
}