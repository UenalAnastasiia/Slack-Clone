import { Component, OnInit } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { collection, deleteDoc, doc } from 'firebase/firestore';
import { Message } from 'src/models/message.class';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-message',
  templateUrl: './user-message.component.html',
  styleUrls: ['./user-message.component.scss']
})
export class UserMessageComponent implements OnInit {
  chatID: any;
  message: Message;
  allMessages$: Observable<any>;
  allMessages: any = [];
  noMessages: boolean = true;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private activeRoute: ActivatedRoute, private firestore: Firestore, public authService: AuthService, private messageTipp: MatSnackBar) { }
  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(params => {
      this.chatID = params.get('id');
    });

    this.activeRoute.params.subscribe(routeParams => {
      this.loadMessages(routeParams['id']);
    });
  }


  loadMessages(id: string) {
    const messageCollection = collection(this.firestore, "chats", id, "chatMessage");
    this.allMessages$ = collectionData(messageCollection);

    this.allMessages$.subscribe((data: any) => {
      this.allMessages = data;
      data.length >= 1 ? this.noMessages = false : this.noMessages = true;

      return this.allMessages.sort((a, b) => {
        return <any>new Date(a.messageDateTime) - <any>new Date(b.messageDateTime);
      });
    });
  }


  async deleteMessage(id: string, user: string) {
    if (user == this.authService.userName) {
      await deleteDoc(doc(this.firestore, "chats", this.chatID, "chatMessage", id));
    } else {
      this.messageTipp.open('Can not delete this message!', '', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 1000
      });
    }
  }
}