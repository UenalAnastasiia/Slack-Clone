import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChannelContainerComponent } from './channel-section/channel-container/channel-container.component';
import { ThreadContainerComponent } from './thread-section/thread-container/thread-container.component';

const routes: Routes = [
  { path: 'channel', component: ChannelContainerComponent },
  { path: 'channel/:id', component: ChannelContainerComponent },
  // { path: 'channel/:id/:threadId', component: ThreadDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
