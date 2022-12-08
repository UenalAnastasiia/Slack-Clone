import { Injectable } from '@angular/core';
import { Storage, ref, uploadBytes, listAll, getDownloadURL, uploadBytesResumable } from '@angular/fire/storage';
import { finalize, from, map, Observable, switchMap } from 'rxjs';
import { list } from 'firebase/storage';


@Injectable({
  providedIn: 'root'
})
export class UploadService {
  fileDoc: string[];
  fileURL: any;


  constructor(private storage: Storage) {
    this.fileDoc = [];
    // this.getFile();
  }


  // public uploadFile(file: File) {
  //   const fileRef = ref(this.storage, `file/${file.name}`);

  //   uploadBytes(fileRef, file)
  //     .then(() => {
  //       this.getFile();
  //     })
  //     .catch(error => console.log(error));
  // }


  // getFile() {
  //   const fileRef = ref(this.storage, 'file');
  //   console.log('Ref ', fileRef)

  //   list(fileRef)
  //     .then(async (response) => {
  //       this.fileDoc = [];
  //       for (let item of response.items) {
  //         const url = await getDownloadURL(item);
  //         this.fileDoc.push(url);
  //         this.fileURL = url;
  //         console.log('File: ', url)
  //       }
  //     })
  //     .catch(error => console.log(error));
  // }
}