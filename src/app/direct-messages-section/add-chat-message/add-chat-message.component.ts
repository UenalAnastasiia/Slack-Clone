import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { FileHandle } from 'src/app/services/dragDrop.directive';
import { AuthService } from 'src/app/services/auth.service';
import { Chat } from 'src/models/chat.class';
import { Message } from 'src/models/message.class';


@Component({
  selector: 'app-add-chat-message',
  templateUrl: './add-chat-message.component.html',
  styleUrls: ['./add-chat-message.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddChatMessageComponent implements OnInit {
  chat: Chat;
  chatID: any;
  message: Message = new Message();

  public file: any = {};
  files: FileHandle[] = [];
  dropzoneHovered: boolean;
  hideInputChoose: boolean = false;
  hideFile: boolean = false;

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
  }


  constructor(private activeRoute: ActivatedRoute,
    private firestore: Firestore,
    private service: AuthService) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(routeParams => {
      this.chatID = routeParams['id'];
    });
  }


  onKeypressEvent(event: any, text: string) {
    if (event.keyCode == 13) {
      event.preventDefault();
      this.sendMessage(text);
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
    this.hideInputChoose = true;
    this.dropzoneHovered = true;
  }


  async sendMessage(text: string) {
    let dateTime = new Date();
    const collRef = collection(this.firestore, "chats", this.chatID, "chatMessage");
    const dataRef = await addDoc(collRef, { messageText: this.message.messageText });
    
    this.message.messageID = dataRef.id;
    this.message.user = this.service.userName;
    this.message.userImg = this.service.userImg;
    this.message.messageDateTime = dateTime.toISOString();
    this.hideFile === true ? this.uploadFileToDB(this.message.messageID, text) : this.hideFile = false;
    await setDoc(doc(this.firestore, "chats", this.chatID, "chatMessage", this.message.messageID), this.message.toJSON());
    this.cleanInputFile(this.file);
    this.message.messageText = '';
  }


  cleanInputFile(file: any) {
    this.message.uploadFile = '';
    this.hideFile = false;
    this.dropzoneHovered = false;
    let index = this.files.indexOf(file);
    this.files.splice(index, 1);
  }


  uploadFileToDB(id: string, text: string) {
    const storage = getStorage();
    const storageRef = ref(storage, this.file.name);
    if (this.file) {
      const uploadTask = uploadBytesResumable(storageRef, this.file);
      uploadTask.on('state_changed', (snapshot) => { const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100; },
        (error) => { console.log(error) },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            this.message.uploadFile = downloadURL;
            this.message.messageText = text;
            await setDoc(doc(this.firestore, "chats", this.chatID, "chatMessage", this.message.messageID), this.message.toJSON());
          });
        });
    }
  }
}