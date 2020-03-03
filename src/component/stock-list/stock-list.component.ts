import { Component, OnInit } from '@angular/core';
import { Stock } from '../../model/stock';
import { UserService } from '../../service/user-service.service';
import { Pair } from 'src/model/pair';
import { Resolve } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {

  stocks: Stock[];
  cash: number;
  total: number;
  condition: Boolean;
 
  constructor(private userService: UserService) {
    this.condition = true;
    this.total = 0;
  }
 
  ngOnInit() {
    this.userService.getPair(sessionStorage.getItem('username')).then(data => {
        this.stocks = data.stocks;
        this.cash = data.user.cash;
        this.stocks.forEach(stock => {
          this.total += stock.total;
        });
        this.total += this.cash;
        this.condition = false;
        console.log(sessionStorage.getItem('username'));
        error => console.log(error);
    });
    
  }
}
