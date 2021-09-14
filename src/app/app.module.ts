import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RegisterComponent } from './page/register/register.component';
import { LoginComponent } from './page/login/login.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { ChatRoomComponent } from './page/chat-room/chat-room.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { LoadingComponent } from './message/loading/loading.component';
import { AlertComponent } from './message/alert/alert.component';
import { FormGroupComponent } from './forms/form-group/form-group.component';
import { CardComponent } from './container/card/card.component';
import { ChatDirectComponent } from './page/chat-direct/chat-direct.component';
import { ProfileComponent } from './page/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    ChatRoomComponent,
    LoadingComponent,
    AlertComponent,
    FormGroupComponent,
    CardComponent,
    ChatDirectComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
