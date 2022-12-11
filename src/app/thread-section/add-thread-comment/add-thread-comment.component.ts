import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Firestore, doc, getDoc, setDoc, collectionData, updateDoc } from '@angular/fire/firestore';
import { Channel } from 'src/models/channel.class';
import { Thread } from 'src/models/thread.class';
import { collection, addDoc } from '@firebase/firestore';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getAuth, onAuthStateChanged } from "firebase/auth";

@Component({
  selector: 'app-add-thread-comment',
  templateUrl: './add-thread-comment.component.html',
  styleUrls: ['./add-thread-comment.component.scss']
})
export class AddThreadCommentComponent implements OnInit {
  channel: Channel = new Channel();
  channelData: any;

  detailsID: any;
  allComments$: Observable<any>;
  allComments: any = [];
  commentsLength: number;
  commentData: any;

  public file: any = {};
  hideFile: boolean = false;

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


  constructor(
    private activeRoute: ActivatedRoute,
    private firestore: Firestore,
    private messageTipp: MatSnackBar,
    private service: AuthService) { }


  ngOnInit(): void {
    this.detailsID = JSON.parse(localStorage.getItem('ThreadID'));
    this.service.getLoggedUser();
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


  onFilechange(event: any) {
    this.file = event.target.files[0];
    this.hideFile = true;
  }


  cleanInputFile() {
    this.thread.uploadFile = '';
    this.hideFile = false;
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
    this.setDocToDB(dateTime, dataRef);
    this.getCommentsLength();
  }


  async setDocToDB(dateTime: Date, dataRef: any) {
    this.thread.commentID = dataRef.id;
    this.thread.commentUser = this.service.userName;
    this.thread.commentThreadID = this.detailsID;
    this.thread.commentDateTime = dateTime.toISOString();
    await setDoc(doc(this.firestore, "threads", this.detailsID, "threadComment", this.thread.commentID), this.thread.toJSON());
    this.thread.commentMessage = '';
    this.hideFile === true ? this.uploadFileToDB() : this.hideFile = false;
    this.saveUserImgToDB();
    this.cleanInputFile();
  }


  async getCommentsLength() {
    const commentCollection = collection(this.firestore, "threads", this.detailsID, "threadComment");
    this.allComments$ = collectionData(commentCollection);

    this.allComments$.subscribe(async (data: any) => {
      this.allComments = data;
      this.updateLengthData(data);
    });
  }


  async updateLengthData(data: any) {
    this.thread.commentLength = data.length;
    await updateDoc(doc(this.firestore, "threads", this.detailsID), {
      commentLength: this.thread.commentLength,
      commentLengthText: true
    });
  }


  uploadFileToDB() {
    const storage = getStorage();
    const storageRef = ref(storage, this.file.name);
    if (this.file) {
      const uploadTask = uploadBytesResumable(storageRef, this.file);
      uploadTask.on('state_changed', (snapshot) => { const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100; },
        (error) => { console.log(error) },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(this.firestore, "threads", this.detailsID, "threadComment", this.thread.commentID),
              { uploadFileComment: downloadURL });
          });
        });
    }
  }


  saveUserImgToDB() {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        let userImg = user.photoURL;
        await updateDoc(doc(this.firestore, "threads", this.detailsID, "threadComment", this.thread.commentID),
          { userImgComment: userImg });
      }
    });
  }
}