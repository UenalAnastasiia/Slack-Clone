import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DialogAddChannelComponent } from './channel-section/dialog-add-channel/dialog-add-channel.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ChannelContainerComponent } from './channel-section/channel-container/channel-container.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { MatCardModule } from '@angular/material/card';
import { DialogChannelDetailsComponent } from './channel-section/dialog-channel-details/dialog-channel-details.component';
import { MatTabsModule } from '@angular/material/tabs';
import { DialogEditChannelComponent } from './channel-section/dialog-edit-channel/dialog-edit-channel.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from "@angular/common";
import { AddThreadComponent } from './thread-section/add-thread/add-thread.component';
import { HttpClientModule } from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ThreadContainerComponent } from './thread-section/thread-container/thread-container.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ThreadDetailsComponent } from './thread-section/thread-details/thread-details.component';
import { AddThreadCommentComponent } from './thread-section/add-thread-comment/add-thread-comment.component';
import { AuthService } from './services/auth.service';
import { RegisterComponent } from './authentication/register/register.component';
import { LoginComponent } from './authentication/login/login.component';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { MatMenuModule } from '@angular/material/menu';
import { DialogEditUserComponent } from './dialog-edit-user/dialog-edit-user.component';
import { DragDirective } from './dragDrop.directive';
import { NamePipe } from './name.pipe';
import { DialogCreateChatComponent } from './direct-messages-section/dialog-create-chat/dialog-create-chat.component';
import { MatSelectModule } from '@angular/material/select';
import { ChatComponent } from './direct-messages-section/chat/chat.component';
import { AddChatMessageComponent } from './direct-messages-section/add-chat-message/add-chat-message.component';


@NgModule({
  declarations: [
    AppComponent,
    DialogAddChannelComponent,
    ChannelContainerComponent,
    DialogChannelDetailsComponent,
    DialogEditChannelComponent,
    AddThreadComponent,
    ThreadContainerComponent,
    ThreadDetailsComponent,
    AddThreadCommentComponent,
    RegisterComponent,
    LoginComponent,
    DialogEditUserComponent,
    DragDirective,
    NamePipe,
    DialogCreateChatComponent,
    ChatComponent,
    AddChatMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatTooltipModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatCardModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    AngularEditorModule,
    MatSnackBarModule,
    MatMenuModule,
    MatSelectModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage())
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
