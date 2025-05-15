export class Vendor {
  constructor(
    public name: string,
    public email: string,
    public phone: string,
    public location: string,
    public createdAt?: Date,
    public updatedAt?: Date
  ) {}
}
