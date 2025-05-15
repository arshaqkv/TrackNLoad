export class Product {
  constructor(
    public name: string,
    public price: number,
    public category: string,
    public image?: string,
    public createdAt?: Date,
    public updatedAt?: Date
  ) {}
}
