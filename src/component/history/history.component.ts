import { Component, OnInit } from '@angular/core';
import { Stock } from '../../model/stock';
import { UserService } from '../../service/user-service.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  selectedNum: number;
  stocks: Stock[];
  targetStock: Stock;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  onSelectItem() {
    switch(this.selectedNum) {
      // The most profitable stock in inventory
      case 1:
        this.userService.getStockList(sessionStorage.getItem('username')).then(async data => {
          await data.sort((a, b) => this.earning(a) < this.earning(b) ? 1 : this.earning(a) > this.earning(b) ? -1 : 0);
          this.targetStock = await data[0];
        });
        break;
      // The rank of stocks profitability
      case 2:
        this.userService.getStockList(sessionStorage.getItem('username')).then(data => {
          data.sort((a, b) => this.earning(a) < this.earning(b) ? 1 : this.earning(a) > this.earning(b) ? -1 : 0);
          this.stocks = data;
        });
        break;
      // The stock has highest price in inventory 
      case 3:
        this.userService.getStockList(sessionStorage.getItem('username')).then(data => {
          data.sort((a, b) => a.price < b.price ? 1 : a.price > b.price ? -1 : 0);
          this.stocks = data;
          this.targetStock = data[0];
        });
        break;
      default:
        break;
    }

  }
  earning(stock: Stock) {
    return stock.total - (stock.cost * stock.shares);
  }

}
