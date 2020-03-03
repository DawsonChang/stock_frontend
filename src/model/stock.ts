
export class Stock {
    id: string;
    symbol: string;
    name: string;
    shares: number;
    price: number;
    total: number;
    cost: number;
    username: string;

    constructor(username) {
        this.username = username;
    }

}
