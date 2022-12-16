import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { FileHandle } from 'src/app/dragDrop.directive';
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


  onKeypressEvent(event: any) {
    if (event.keyCode == 13) {
      event.preventDefault();
      this.sendMessage();
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


  async sendMessage() {
    let dateTime = new Date();
    const collRef = collection(this.firestore, "chats", this.chatID, "chatMessage");
    const dataRef = await addDoc(collRef, {
      messageText: this.message.messageText
    });
    this.message.messageID = dataRef.id;
    this.message.user = this.service.userName;
    this.message.userImg = this.service.userImg;
    this.message.messageDateTime = dateTime.toISOString();
    await setDoc(doc(this.firestore, "chats", this.chatID, "chatMessage", this.message.messageID), this.message.toJSON());
    this.message.messageText = '';
  }


  cleanInputFile(file: any) {
    this.message.uploadFile = '';
    this.hideFile = false;
    this.dropzoneHovered = false;
    let index = this.files.indexOf(file);
    this.files.splice(index, 1);
  }

}
