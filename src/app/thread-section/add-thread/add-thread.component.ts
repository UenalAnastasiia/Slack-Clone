import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Firestore, doc, getDoc, setDoc, updateDoc } from '@angular/fire/firestore';
import { Channel } from 'src/models/channel.class';
import { Thread } from 'src/models/thread.class';
import { collection, addDoc } from '@firebase/firestore';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { UploadService } from 'src/app/upload.service';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


@Component({
  selector: 'app-add-thread',
  templateUrl: './add-thread.component.html',
  styleUrls: ['./add-thread.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddThreadComponent implements OnInit {
  channel: Channel = new Channel();
  channelData: any;
  public file: any = {};
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
    private service: AuthService,
    public uploadService: UploadService) { }


  ngOnInit(): void {
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
    console.log('File thread: ', this.uploadService.fileURL)
    let dateTime = new Date();
    const docRef = await addDoc(collection(this.firestore, "threads"), this.thread.toJSON())
    this.thread.id = docRef.id;
    this.thread.sendDateTime = dateTime.toISOString();
    this.thread.currentUser = this.service.loggedUser;
    await setDoc(doc(this.firestore, "threads", this.thread.id), this.thread.toJSON());
    this.uploadFileToDB();
    this.thread.message = '';
  }


  onFilechange(event: any) {
    this.file = event.target.files[0];
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
            await updateDoc(doc(this.firestore, "threads", this.thread.id),
              { uploadFile: downloadURL });
          });
        });
    }
  }
}