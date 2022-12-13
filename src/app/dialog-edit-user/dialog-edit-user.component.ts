import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import { getAuth, updateProfile } from "firebase/auth";
import { FormControl, FormGroup } from '@angular/forms';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Thread } from 'src/models/thread.class';
import { Observable } from 'rxjs';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { collection, doc, query, where, getDocs, updateDoc, writeBatch } from 'firebase/firestore';
import { ThreadComment } from 'src/models/threadcomment.class';


@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent implements OnInit {
  @ViewChild("inputFile", {static: false}) InputFile: ElementRef;

  editForm: FormGroup;
  public file: any = {};

  thread = new Thread();
  allThreads$: Observable<any>;
  allComments$: Observable<any>;
  allThreads: any = [];
  allComments: any = [];
  dataID: any;
  threadComment: ThreadComment = new ThreadComment();
  commentDataID: any;
  localThreadID: any;
  commentDataName: any;
  loadProgress: boolean = false;
  showInput: boolean = false;
  saveImgIcon: boolean = false;
  imageSrc: any;
  previewImg: boolean = false;


  constructor(public authService: AuthService, public dialogRef: MatDialogRef<DialogEditUserComponent>, private firestore: Firestore) {
    this.authService.getLoggedUser();

    this.editForm = new FormGroup({
      img: new FormControl(),
      email: new FormControl(),
      name: new FormControl()
    });
  }

  ngOnInit(): void {
    this.localThreadID = JSON.parse(localStorage.getItem('ThreadID'));
  }


  onFilechange(event: any) {
    this.file = event.target.files[0];
    this.saveImgIcon = true;

    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.previewImg = true;
      this.imageSrc = this.authService.userImg;

      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;

      reader.readAsDataURL(file);
  }
  }


  cleanInputFile() {
    this.InputFile.nativeElement.value = "";
    this.saveImgIcon = false;
  }


  async editUserImg() {
    this.loadProgress = true;
    const storage = getStorage();
    const storageRef = ref(storage, this.file.name);
    if (this.file) {
      const uploadTask = uploadBytesResumable(storageRef, this.file);
      uploadTask.on('state_changed', (snapshot) => { const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100; },
        (error) => { console.log(error) },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            const auth = getAuth();
            await updateProfile(auth.currentUser, {
              photoURL: downloadURL
            }).then(() => {
              this.getUserImgThread(auth.currentUser, downloadURL);
              this.getUserImgComment(auth.currentUser, downloadURL);

              setTimeout(() => {
                this.loadProgress = false;
                this.showInput = false;
                location.reload();
              }, 3000);
            }).catch((error) => {
              console.log(error)
              error = error
            });
          });
        });
    }
  }


  async getUserImgThread(currentUser: any, downloadURL: any) {
    const queryCollection = query(collection(this.firestore, "threads"), where("currentUser", "==", currentUser.displayName));
    const querySnapshot = await getDocs(queryCollection);
    querySnapshot.forEach(() => {
      this.allComments$ = collectionData(queryCollection, { idField: "threadID" });
      this.updateUserImgThread(downloadURL);
    });
  }


  updateUserImgThread(downloadURL: any) {
    this.allComments$.subscribe(async (data: any) => {
      this.allComments = data;
      this.dataID = data.map(data => data.id);

      for (let index = 0; index < this.dataID.length; index++) {
        const element = this.dataID[index];
        // const batch = writeBatch(this.firestore);
        // const sfRef = doc(this.firestore, "threads", element);
        // batch.update(sfRef, { "userImg": downloadURL });
        await updateDoc(doc(this.firestore, "threads", element),
          { userImg: downloadURL });
      }
    });
  }


  async getUserImgComment(currentUser: any, downloadURL: any) {
    const queryCollection = query(collection(this.firestore, "threadComment"), where("commentUser", "==", currentUser.displayName));
    const querySnapshot = await getDocs(queryCollection);
    querySnapshot.forEach(() => {
      this.allThreads$ = collectionData(queryCollection, { idField: "threadID" });
      this.updateUserImgComment(downloadURL);
    });
  }


  updateUserImgComment(downloadURL: any) {
    this.allThreads$.subscribe(async (data: any) => {
      this.allThreads = data;
      this.commentDataID = data.map(data => data.commentID);

      for (let index = 0; index < this.commentDataID.length; index++) {
        const element = this.commentDataID[index];
        await updateDoc(doc(this.firestore, "threadComment", element),
          { userImgComment: downloadURL });
      }
    });
  }
}
