import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChannelContainerComponent } from './channel-container/channel-container.component';

const routes: Routes = [
  { path: 'channel', component: ChannelContainerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
