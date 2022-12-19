import { Component, OnInit } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { addDoc, collection, doc, query, setDoc, where } from 'firebase/firestore';
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

  allChats$: Observable<any>;
  allChats: any = [];
  chatNames: any = [];

  value: string;
  chatExist: boolean;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';


  constructor(public dialogRef: MatDialogRef<DialogCreateChatComponent>,
    private firestore: Firestore,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    const userCollection = collection(this.firestore, 'users');
    this.allusers$ = collectionData(userCollection);

    this.allusers$.subscribe((data: any) => {
      this.allusers = data;
    });
  }


  async createChat() {
      const docRef = await addDoc(collection(this.firestore, "chats"), this.chat.toJSON());
      this.chat.id = docRef.id;
      this.chat.firstUser = this.authService.userName;
      await setDoc(doc(this.firestore, "chats", this.chat.id), this.chat.toJSON());
      location.reload();
      this.router.navigateByUrl(`chat/${this.chat.id}`);
    }
  }