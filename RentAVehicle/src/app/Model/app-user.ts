export class AppUser {
    constructor(
      public name: string,
      public surname: string,
	  public username: string,
	  public birthDate : Date,
      public allowed: boolean,
	  public loggedIn: boolean,
	  public createService: boolean
  ){}
}
