import { Component, OnInit } from '@angular/core';
import { Firestore, doc, getDoc, collectionData } from '@angular/fire/firestore';
import { collection, query, where, getDocs, orderBy, deleteDoc, updateDoc } from 'firebase/firestore';
import { Channel } from 'src/models/channel.class';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Thread } from 'src/models/thread.class';
import { ThreadComment } from 'src/models/threadcomment.class';
import { getAuth } from 'firebase/auth';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-thread-details',
  templateUrl: './thread-details.component.html',
  styleUrls: ['./thread-details.component.scss']
})
export class ThreadDetailsComponent implements OnInit {
  channelID: string;
  channel: Channel = new Channel();
  channelData: any;

  thread = new Thread();
  currentThread$: Observable<any>;
  currentThread: any = [];
  detailsID: string;

  threadComment: ThreadComment = new ThreadComment();
  allComments$: Observable<any>;
  allComments: any = [];
  commentLengthText: boolean;

  public commentsLength: number;
  countBtn: boolean = false;
  showComments: boolean = true;
  btnText: string = 'Comments';

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';



  constructor(private activeRoute: ActivatedRoute, private firestore: Firestore, private messageTipp: MatSnackBar) { }

  ngOnInit(): void {
    this.detailsID = JSON.parse(localStorage.getItem('ThreadID'));
    this.activeRoute.params.subscribe(routeParams => {
      this.getDocRef(routeParams['id']);
      this.getThread();
      this.getThreadComments();
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


  async getThreadComments() {
    const queryCollection = query(collection(this.firestore, "threadComment"), where("threadID", "==", this.detailsID), orderBy("dateTime"));
    const querySnapshot = await getDocs(queryCollection);

    querySnapshot.forEach(() => {
      this.allComments$ = collectionData(queryCollection, { idField: "threadID" });
      this.allComments$.subscribe((data: any) => {
        this.allComments = data;
        this.commentsLength = data.length;
        this.btnText = this.commentsLength == 1 ? 'Comment' : 'Comments';
      });
    });
  }


  async deleteThread(id: string, name: string) {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user.displayName == name) {
      await deleteDoc(doc(this.firestore, "threadComment", id));
      this.updateThreadData();
      this.showSnackMessage();
    } else {
      this.showUserTipp();
    }
  }


  async updateThreadData() {
    this.commentsLength >= 1 ? this.commentLengthText = true : this.commentLengthText = false;

    await updateDoc(doc(this.firestore, "threads", this.detailsID), {
      commentLength: this.commentsLength,
      commentLengthText: this.commentLengthText
    });
  }


  showSnackMessage() {
    this.messageTipp.open('Comment deleted!', '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 1000
    });
  }


  showUserTipp() {
    this.messageTipp.open('You can not delete this comment!', '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 1000
    });
  }

}