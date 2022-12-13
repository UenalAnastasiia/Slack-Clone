import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { collection, doc, getDoc, query, where, getDocs, orderBy } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ShareService } from 'src/app/services/share.service';
import { Channel } from 'src/models/channel.class';
import { Thread } from 'src/models/thread.class';
import { ThreadComment } from 'src/models/threadcomment.class';


@Component({
  selector: 'app-thread-container',
  templateUrl: './thread-container.component.html',
  styleUrls: ['./thread-container.component.scss']
})
export class ThreadContainerComponent implements OnInit {
  thread = new Thread();
  allThreads$: Observable<any>;
  allThreads: any = [];
  noThreads: boolean = false;
  threadID: any;

  channel = new Channel();
  channelData: any;

  threadComment: ThreadComment = new ThreadComment();

  @Output() threadShow = new EventEmitter<boolean>();
  showDetails: boolean;


  constructor(private firestore: Firestore, private activeRoute: ActivatedRoute, public service: ShareService, public authService: AuthService) { }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(params => {
      this.threadID = params.get('id');
    });

    this.activeRoute.params.subscribe(routeParams => {
      this.getDocRef(routeParams['id']);
    });
  }


  async getDocRef(id: string) {
    const docRef = doc(this.firestore, `channels/${id}`);
    const snapDoc = await getDoc(docRef);
    this.channelData = snapDoc.data();
    this.channel = new Channel(this.channelData);
    this.loadThreadsFromDB();
  }


  /**
   * Compromise between Channel-ID and Thread-Channel-ID
   * If Channel-ID = Thread-Channel-ID => Load Data from DB
   */
  async loadThreadsFromDB() {
    this.noThreads = true;
    const queryCollection = query(collection(this.firestore, "threads"), where("channelID", "==", this.channel.id), orderBy("sendDateTime", "desc"));

    const querySnapshot = await getDocs(queryCollection);
    querySnapshot.forEach(() => {
      this.noThreads = false;
      this.allThreads$ = collectionData(queryCollection, { idField: "threadID" });
      this.subscribeData();
    });
  }


  subscribeData() {
    this.allThreads$.subscribe((data: any) => {
      this.allThreads = data;
      data.length >= 1 ? this.noThreads = false : this.noThreads = true;
    });
  }


  openDetails(id: string) {
    this.showDetails = !this.showDetails;
    this.threadShow.emit(this.showDetails);
    localStorage.setItem('ThreadID', JSON.stringify(id));
  }
}