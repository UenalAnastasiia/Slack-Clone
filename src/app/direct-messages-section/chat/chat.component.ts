import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { doc, getDoc } from 'firebase/firestore';
import { Chat } from 'src/models/chat.class';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  chat: Chat = new Chat();
  chatID: any;
  chatData: any;


  constructor(private activeRoute: ActivatedRoute, private firestore: Firestore) { }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(params => {
      this.chatID = params.get('id');
    });

    this.activeRoute.params.subscribe(routeParams => {
      this.getDocRef(routeParams['id']);
    });
  }


  async getDocRef(id: string) {
    const docRef = doc(this.firestore, `chats/${id}`);
    const snapDoc = await getDoc(docRef);
    this.chatData = snapDoc.data();
    this.chat = new Chat(this.chatData);
  }


}
