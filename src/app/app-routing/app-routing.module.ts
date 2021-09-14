import { NgModule } from '@angular/core'; 
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../page/login/login.component';
import { DashboardComponent } from '../page/dashboard/dashboard.component';
import { ChatRoomComponent } from '../page/chat-room/chat-room.component';
import { RegisterComponent } from '../page/register/register.component';



const routes: Routes = [
  // { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // { path: 'index', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  // { path: 'management', component: ManagementComponent },
  { path: 'chat-room/:roomId', component: ChatRoomComponent },

 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
