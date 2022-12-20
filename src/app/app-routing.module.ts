import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChannelContainerComponent } from './channel-section/channel-container/channel-container.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { RegisterComponent } from './authentication/register/register.component';
import { LoginComponent } from './authentication/login/login.component';
import { ChatComponent } from './direct-messages-section/chat/chat.component';
import { DataProtectionComponent } from './footer-section/data-protection/data-protection.component';
import { ImprintComponent } from './footer-section/imprint/imprint.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/channel' },
  { path: 'channel', component: ChannelContainerComponent, ...canActivate(() => redirectUnauthorizedTo(['/login']))},
  { path: 'channel/:id', component: ChannelContainerComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'chat/:id', component:  ChatComponent},
  { path: 'imprint', component: ImprintComponent },
  { path: 'data-protection', component: DataProtectionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
