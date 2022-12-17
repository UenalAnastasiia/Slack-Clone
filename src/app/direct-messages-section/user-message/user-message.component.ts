import { Component, OnInit } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { collection } from 'firebase/firestore';
import { Message } from 'src/models/message.class';
import { Observable } from 'rxjs';
import { getStorage, ref } from 'firebase/storage';


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

  constructor(private activeRoute: ActivatedRoute, private firestore: Firestore) { }

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
}