import { AppUser } from "./app-user";

export class Rate {
    constructor(
    public Id : number,
    public Point : number,
    public Comment : string,
    public AppUserId : number,
    public ServiceId : number,
    public AppUser : AppUser
  ){}
}
