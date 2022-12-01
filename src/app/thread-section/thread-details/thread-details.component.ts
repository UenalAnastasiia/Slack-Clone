import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Firestore, doc, getDoc, collectionData } from '@angular/fire/firestore';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Channel } from 'src/models/channel.class';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Thread } from 'src/models/thread.class';

@Component({
  selector: 'app-thread-details',
  templateUrl: './thread-details.component.html',
  styleUrls: ['./thread-details.component.scss']
})
export class ThreadDetailsComponent implements OnInit {
  channelID: string;
  channel: Channel = new Channel();
  channelData: any;

  currentThread$: Observable<any>;
  currentThread: any = [];
  detailsID: string;


  constructor(private activeRoute: ActivatedRoute, private firestore: Firestore, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(routeParams => {
      this.getDocRef(routeParams['id']);
      this.detailsID = JSON.parse(localStorage.getItem('ThreadID'));
      this.getThread();
    });
  }


  async getDocRef(id: string) {
    const docRef = doc(this.firestore, `channels/${id}`);
    const snapDoc = await getDoc(docRef);
    this.channelData = snapDoc.data();
    this.channel = new Channel(this.channelData);
  }


  async getThread() {
    const queryCollection = query(collection(this.firestore, "threads"), where("id", "==", this.detailsID));

    const querySnapshot = await getDocs(queryCollection);
    querySnapshot.forEach(() => {
      this.currentThread$ = collectionData(queryCollection, { idField: "threadID" });
      this.subscribeData();
    });
  }


  subscribeData() {
    this.currentThread$.subscribe((data: any) => {
      this.currentThread = data;
    });
  }
}
