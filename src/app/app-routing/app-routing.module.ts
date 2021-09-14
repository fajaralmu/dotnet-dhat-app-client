import { NgModule } from '@angular/core'; 
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../page/login/login.component';
import { DashboardComponent } from '../page/dashboard/dashboard.component';
import { ChatRoomComponent } from '../page/chat-room/chat-room.component';
import { RegisterComponent } from '../page/register/register.component';
import { ChatDirectComponent } from '../page/chat-direct/chat-direct.component';
import { ProfileComponent } from '../page/profile/profile.component';


const routes: Routes = [
  // { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // { path: 'index', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'profile', component: ProfileComponent },
  // { path: 'management', component: ManagementComponent },
  { path: 'chat-room', component: ChatRoomComponent },
  { path: 'chat-direct', component: ChatDirectComponent },

 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
