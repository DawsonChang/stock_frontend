import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Stock } from '../model/stock';
import { Pair } from 'src/model/pair';

 
@Injectable()
export class UserService {
 
  private homeUrl: string;
  private quoteUrl: string;
  private buyUrl: string;
  private sellUrl: string;
  private loginUrl: string;
  private registerUrl: string;
 
  constructor(
    private http: HttpClient
    ) {
    this.homeUrl = 'https://localhost:8443/stock';
    this.quoteUrl = 'https://localhost:8443/stock/quote';
    this.buyUrl = 'https://localhost:8443/stock/buy';
    this.sellUrl = 'https://localhost:8443/stock/sell';
    this.loginUrl = 'https://localhost:8443/stock/login';
    this.registerUrl = 'https://localhost:8443/stock/register';

    // this.homeUrl = 'http://localhost:9090';
    // this.quoteUrl = 'http://localhost:9090/quote';
    // this.buyUrl = 'http://localhost:9090/buy';
    // this.sellUrl = 'http://localhost:9090/sell';
    // this.loginUrl = 'http://localhost:9090/login';
    // this.registerUrl = 'http://localhost:9090/register';
  }

  // for component stock-list
  public getPair(currentUsername: string) {
    let params = new HttpParams();
    params = params.append('currentUsername', currentUsername);
    return this.http.get<Pair>(this.homeUrl, {params: params}).toPromise();
  }
 
  // for component quote
  public searchStock(stock: Stock) {
    return this.http.post<Stock>(this.quoteUrl, stock);
  }

  public buyStock(stock: Stock) {
    return this.http.post<number>(this.buyUrl, stock);
  }

  // for component sell
  public getStockList(currentUsername: string) {
    let params = new HttpParams();
    params = params.append('currentUsername', currentUsername);
    return this.http.get<Stock[]>(this.sellUrl, {params: params}).toPromise();
  }
  
  public sellStock(stock: Stock) {
    return this.http.post<Stock>(this.sellUrl, stock);
  }

  // for component login
  public postLogin(userPair: string[]) {
    return this.http.post<Boolean>(this.loginUrl, userPair).toPromise();
  }

  // for component register
  public postRegister(userPair: string[]) {
    return this.http.post<number>(this.registerUrl, userPair).toPromise();
  }
}