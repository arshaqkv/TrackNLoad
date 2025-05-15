export class OrderProduct {
  constructor(
    public productId: string,
    public name: string,
    public price: number,
    public quantity: number
  ) {}
}

export class Order {
  constructor(
    public orderId: string,
    public truckDriver: string,
    public vendor: string,
    public products: OrderProduct[],
    public totalAmount: number,
    public collectedAmount: number,
    public createdAt?: Date,
    public updatedAt?: Date
  ) {}
}
