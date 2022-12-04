import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChannelContainerComponent } from './channel-section/channel-container/channel-container.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/channel' },
  { path: 'channel', component: ChannelContainerComponent, ...canActivate(() => redirectUnauthorizedTo(['/login']))
  },
  { path: 'channel/:id', component: ChannelContainerComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
