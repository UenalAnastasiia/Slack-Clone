import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Firestore, doc, getDoc, setDoc, collectionData, updateDoc } from '@angular/fire/firestore';
import { Channel } from 'src/models/channel.class';
import { Thread } from 'src/models/thread.class';
import { collection, addDoc, query, where, getDocs } from '@firebase/firestore';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ThreadComment } from 'src/models/threadcomment.class';
import { FileHandle } from 'src/app/dragDrop.directive';

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
  threadComment: ThreadComment = new ThreadComment();
  commentsLength: number;
  commentData: any;

  public file: any = {};
  files: FileHandle[] = [];
  dropzoneHovered: boolean;
  hideInputChoose: boolean  = false;
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


  filesDropped(files: FileHandle[]): void {
    this.files = files;
    this.file = files[0].file;
    this.hideFile = true;
    this.hideInputChoose= true;
    this.dropzoneHovered = true;
  }


  cleanInputFile(file: any) {
    this.thread.uploadFile = '';
    this.hideFile = false;
    this.dropzoneHovered = false;
    let index = this.files.indexOf(file);
    this.files.splice(index, 1);
  }


  sendComment() {
    if (this.threadComment.message == '') {
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


  showUploadTipp() {
    this.messageTipp.open('Choose a file or load with drag and drop', '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 1000
    });
  }


  async saveComment() {
    let dateTime = new Date();
    const docRef = await addDoc(collection(this.firestore, "threadComment"), this.threadComment.toJSON())
    this.setDocToDB(dateTime, docRef);
  }


  async setDocToDB(dateTime: Date, dataRef: any) {
    this.threadComment.commentID = dataRef.id;
    this.threadComment.commentUser = this.service.userName;
    this.threadComment.threadID = this.detailsID;
    this.threadComment.dateTime = dateTime.toISOString();
    await setDoc(doc(this.firestore, "threadComment", this.threadComment.commentID), this.threadComment.toJSON());
    this.threadComment.message = '';
    this.hideFile === true ? this.uploadFileToDB() : this.hideFile = false;
    this.saveUserImgToDB();
    this.getCommentsLength();
    this.cleanInputFile(this.file);
  }


  async getCommentsLength() {
    const queryCollection = query(collection(this.firestore, "threadComment"), where("threadID", "==", this.detailsID));
    const querySnapshot = await getDocs(queryCollection);

    querySnapshot.forEach(() => {
      this.allComments$ = collectionData(queryCollection, { idField: "threadID" });
      this.updateLengthData();
    });
  }


  updateLengthData() {
    this.allComments$.subscribe(async (data: any) => {
      this.allComments = data;
      this.commentsLength = data.length;

      await updateDoc(doc(this.firestore, "threads", this.detailsID), {
        commentLength: this.commentsLength,
        commentLengthText: true
      });
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
            await updateDoc(doc(this.firestore, "threadComment", this.threadComment.commentID),
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
        await updateDoc(doc(this.firestore, "threadComment", this.threadComment.commentID),
          { userImgComment: userImg });
      }
    });
  }
}