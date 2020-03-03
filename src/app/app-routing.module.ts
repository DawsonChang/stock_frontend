import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StockListComponent } from '../component/stock-list/stock-list.component';
import { QuoteComponent } from '../component/quote/quote.component';
import { SellComponent } from '../component/sell/sell.component';
import { HistoryComponent } from '../component/history/history.component';
import { LoginComponent } from '../component/login/login.component';
import { LogoutComponent } from '../component/logout/logout.component';
import { RegisterComponent } from '../component/register/register.component';
import { AuthGaurdService } from '../service/auth-gaurd.service';


const routes: Routes = [
  { path: '', component: StockListComponent, canActivate:[AuthGaurdService] },
  { path: 'quote', component: QuoteComponent, canActivate:[AuthGaurdService] },
  { path: 'sell', component: SellComponent, canActivate:[AuthGaurdService] },
  { path: 'history', component: HistoryComponent, canActivate:[AuthGaurdService] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'logout', component: LogoutComponent, canActivate:[AuthGaurdService] }
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
