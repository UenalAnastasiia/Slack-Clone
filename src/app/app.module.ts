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

@NgModule({
  declarations: [
    AppComponent,
    DialogAddChannelComponent,
    ChannelContainerComponent,
    DialogChannelDetailsComponent,
    DialogEditChannelComponent,
    AddThreadComponent,
    ThreadContainerComponent,
    ThreadDetailsComponent
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
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
