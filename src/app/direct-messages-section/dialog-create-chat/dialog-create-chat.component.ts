import { Component, OnInit } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { Chat } from 'src/models/chat.class';
import { User } from 'src/models/user.class';
import { Observable } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog-create-chat',
  templateUrl: './dialog-create-chat.component.html',
  styleUrls: ['./dialog-create-chat.component.scss']
})
export class DialogCreateChatComponent implements OnInit {
  chat = new Chat();
  user = new User();
  allusers$: Observable<any>;
  allusers: any = [];
  value: string;
  chatExist: boolean;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  loadProgress: boolean = false;


  constructor(public dialogRef: MatDialogRef<DialogCreateChatComponent>,
    private firestore: Firestore,
    private authService: AuthService,
    private router: Router,
    private messageTipp: MatSnackBar) { }

  ngOnInit(): void {
    const userCollection = collection(this.firestore, 'users');
    this.allusers$ = collectionData(userCollection);

    this.allusers$.subscribe((data: any) => {
      this.allusers = data;
    });
  }


  saveChat(user: string) {
    this.loadProgress = true;
    const chatCollection = collection(this.firestore, 'chats');
    let allChats$ = collectionData(chatCollection);

    allChats$.subscribe((data: any) => {
      this.chatExist = data.some((data) => { return data.firstUser === user || data.secondUser === user });
      this.checkChatExist(this.chatExist);
    });
  }


  checkChatExist(chatExist: boolean) {
    if (chatExist) {
      this.messageTipp.open('Tipp: It is not possible create 2 chats with one user.', '', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 1000
      });
    }
    
    if (!chatExist) {
      this.createNewChat();
    }
  }


  async createNewChat() {
      const docRef = await addDoc(collection(this.firestore, "chats"), this.chat.toJSON());
      this.chat.id = docRef.id;
      this.chat.firstUser = this.authService.userName;
      await setDoc(doc(this.firestore, "chats", this.chat.id), this.chat.toJSON());

      setTimeout(() => {
        this.loadProgress = false;
        location.reload();
      }, 2000);
      this.router.navigateByUrl(`chat/${this.chat.id}`);
    }
  }