import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import { getAuth, updateProfile } from "firebase/auth";
import { FormControl, FormGroup } from '@angular/forms';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Thread } from 'src/models/thread.class';
import { Observable } from 'rxjs';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { collection, doc, query, where, getDocs, updateDoc, writeBatch } from 'firebase/firestore';


@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent implements OnInit {
  editForm: FormGroup;
  public file: any = {};

  thread = new Thread();
  allThreads$: Observable<any>;
  allThreads: any = [];
  dataID: any;
  loadProgress: boolean = false;
  showInput: boolean = false;
  saveImgIcon: boolean = false;
  showEditName: boolean = false;


  constructor(public authService: AuthService, public dialogRef: MatDialogRef<DialogEditUserComponent>, private firestore: Firestore) {
    this.authService.getLoggedUser();

    this.editForm = new FormGroup({
      img: new FormControl(),
      email: new FormControl(),
      name: new FormControl()
    });
  }

  ngOnInit(): void {
  }


  getImgUpload() {
    this.showInput = true;
  }


  onFilechange(event: any) {
    this.file = event.target.files[0];
    this.saveImgIcon = true;
  }


  cleanInputFile() {
    this.thread.uploadFile = '';
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
            }).catch((error) => {
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
      this.allThreads$ = collectionData(queryCollection, { idField: "threadID" });
      this.updateUserImgThread(downloadURL);
    });
  }


  updateUserImgThread(downloadURL: any) {
    this.allThreads$.subscribe(async (data: any) => {
      this.allThreads = data;
      this.dataID = data.map(data => data.id);

      for (let index = 0; index < this.dataID.length; index++) {
        const element = this.dataID[index];
        const batch = writeBatch(this.firestore);
        const sfRef = doc(this.firestore, "threads", element);
        batch.update(sfRef, { "userImg": downloadURL });
        await updateDoc(doc(this.firestore, "threads", element),
          { userImg: downloadURL });
      }
    });

    setTimeout(() => {
      this.loadProgress = false;
      this.showInput = false;
        location.reload();
    }, 2000);
  }


  getEditName() {
    this.showEditName = true;
  }


  async editUserName() {
    const auth = getAuth();
    await updateProfile(auth.currentUser, {
      displayName: this.editForm.get('name').value
    }).then(() => {
      console.log('New Name: ', auth.currentUser.displayName)
    }).catch((error) => {
      error = error
    });
  }
}
