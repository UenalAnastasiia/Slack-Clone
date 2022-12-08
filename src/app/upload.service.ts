import { Injectable } from '@angular/core';
import { Storage, ref, uploadBytes, listAll, getDownloadURL } from '@angular/fire/storage';


@Injectable({
  providedIn: 'root'
})
export class UploadService {
  fileDoc: string[];

  
  constructor(private storage: Storage) {
    this.fileDoc = [];
    this.getFile();
  }


  public uploadfile(file: File) {
    const fileRef = ref(this.storage, `file/${file.name}`);

    uploadBytes(fileRef, file)
      .then(() => {
        this.getFile();
      })
      .catch(error => console.log(error));
  }


  getFile() {
    const fileRef = ref(this.storage, 'file');

    listAll(fileRef)
      .then(async (response) => {
        this.fileDoc = [];
        for (let item of response.items) {
          const url = await getDownloadURL(item);
          this.fileDoc.push(url);

        }
      })
      .catch(error => console.log(error));
  }
}