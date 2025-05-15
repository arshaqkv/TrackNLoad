export class User {
  constructor(
    public name: string,
    public mobile: string,
    public password: string,
    public address: string,
    public dlNumber: string,
    public role: string = "truck driver",
    public profilePic?: string,
    public _id?: string,
    public createdAt?: Date,
    public updatedAt?: Date
  ) {}
}
