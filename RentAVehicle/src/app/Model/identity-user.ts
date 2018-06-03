export class IdentityUser {
    constructor(
	  public name: string,
      public surname: string,
      public username: string,
      public email: string,
      public password: string,
      public confirmPassword: string
    ){}
}
