import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import { getAuth, updateProfile } from "firebase/auth";
import { FormControl, FormGroup } from '@angular/forms';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent implements OnInit {
  formEdit: FormGroup;
  public file: any = {};


  constructor(public authService: AuthService, public dialogRef: MatDialogRef<DialogEditUserComponent>) {
    this.authService.getLoggedUser();

    this.formEdit = new FormGroup({
      img: new FormControl(),
      email: new FormControl(),
      name: new FormControl()
    });
   }

  ngOnInit(): void {
  }


  onFilechange(event: any) {
    this.file = event.target.files[0];
  }


  async editImg() {
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
              location.reload();
            }).catch((error) => {
              error = error
            });
          });
        });
    }
  }


  async editName() {
    const auth = getAuth();
    await updateProfile(auth.currentUser, {
      displayName: this.formEdit.get('name').value
    }).then(() => {
      console.log('New Name: ', auth.currentUser.displayName)
    }).catch((error) => {
      error = error
    });
  }
}
