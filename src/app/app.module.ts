import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { StockListComponent } from '../component/stock-list/stock-list.component';
import { QuoteComponent } from '../component/quote/quote.component';
import { SellComponent } from '../component/sell/sell.component';
import { HistoryComponent } from '../component/history/history.component';
import { LoginComponent } from '../component/login/login.component';
import { LogoutComponent } from '../component/logout/logout.component';
import { RegisterComponent } from '../component/register/register.component';
import { UserService } from '../service/user-service.service';

import { FlashMessagesModule } from 'angular2-flash-messages';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    StockListComponent,
    QuoteComponent,
    SellComponent,
    HistoryComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FlashMessagesModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
