import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { Channel } from 'src/models/channel.class';
import { Thread } from 'src/models/thread.class';
import { collection, addDoc } from '@firebase/firestore';
import { AngularEditorConfig } from '@kolkov/angular-editor';


@Component({
  selector: 'app-add-thread',
  templateUrl: './add-thread.component.html',
  styleUrls: ['./add-thread.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddThreadComponent implements OnInit {
  channel: Channel = new Channel();
  channelData: any;
  name: any;

  thread = new Thread();

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['fontName', 'fontSize']
    ]
  };


  constructor(private activeRoute: ActivatedRoute, private firestore: Firestore) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(routeParams => {
      this.getDocRef(routeParams['id']);
    });
  }


  async getDocRef(id: string) {
    const docRef = doc(this.firestore, `channels/${id}`);
    const snapDoc = await getDoc(docRef);
    this.channelData = snapDoc.data();
    this.channel = new Channel(this.channelData);
    this.thread.channelID = this.channel.id;
  }


  async saveThread() {
    const docRef = await addDoc(collection(this.firestore, "threads"), this.channel.toJSON())
    this.thread.id = docRef.id;
    await setDoc(doc(this.firestore, "threads", this.thread.id), this.thread.toJSON());
    this.thread.message = '';
  }
}
