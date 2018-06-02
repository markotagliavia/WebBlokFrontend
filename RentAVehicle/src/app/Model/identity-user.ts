export class IdentityUser {
    constructor(
      public Name: string,
      public Surname: string,
      public Username: string,
      public Email: string,
      public Password: string,
      public ConfirmPassword: string
    ){}
}
