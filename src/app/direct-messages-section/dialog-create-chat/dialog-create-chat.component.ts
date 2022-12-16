import { Component, OnInit } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { Chat } from 'src/models/chat.class';
import { User } from 'src/models/user.class';
import { Observable } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dialog-create-chat',
  templateUrl: './dialog-create-chat.component.html',
  styleUrls: ['./dialog-create-chat.component.scss']
})
export class DialogCreateChatComponent implements OnInit {
  chat: Chat = new Chat();
  user = new User();
  allusers$: Observable<any>;
  allusers: any = [];
  value: string;


  constructor(public dialogRef: MatDialogRef<DialogCreateChatComponent>, 
    private firestore: Firestore, 
    private authService: AuthService) { }

  ngOnInit(): void {
    const userCollection = collection(this.firestore, 'users');
    this.allusers$ = collectionData(userCollection, {});

    this.allusers$.subscribe((data: any) => {
      this.allusers = data;
    });
  }


  async create() {
    this.chat.firstUser = this.authService.userName;
    const docRef = await addDoc(collection(this.firestore, "chats"), this.chat.toJSON());
    this.chat.id = docRef.id;
    await setDoc(doc(this.firestore, "chats", this.chat.id), this.chat.toJSON());
    this.dialogRef.close();
  }
}
