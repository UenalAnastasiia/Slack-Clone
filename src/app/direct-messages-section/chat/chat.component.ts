import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { collection, deleteDoc, doc, getDoc, getDocs } from 'firebase/firestore';
import { AuthService } from 'src/app/services/auth.service';
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


  constructor(private activeRoute: ActivatedRoute, private firestore: Firestore, public authService: AuthService) { }

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


  async cleanChat(id: string) {
    const querySnapshot = await getDocs(collection(this.firestore, "chats", id, "chatMessage"));
    
    querySnapshot.forEach(async (message) => {
      await deleteDoc(doc(this.firestore, "chats", id, "chatMessage", message.id));
    });
  }
}
