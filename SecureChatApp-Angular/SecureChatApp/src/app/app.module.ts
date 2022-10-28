import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http'

import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { ChatMenuComponent } from './chat-menu/chat-menu.component';
import { HttpInterceptorProviders } from './_interceptors/auth.interceptor';
import { LoginComponent } from './login/login.component';

import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MemberListComponent } from './member-list/member-list.component';
@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    ChatMenuComponent,
    LoginComponent,
    MemberListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    MatCardModule
  ],
  providers: [HttpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
