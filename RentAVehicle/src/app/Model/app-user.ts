export class AppUser {
    constructor(
      public Name: string,
      public Surname: string,
	  public Username: string,
	  public Password: string,
	  public Contact: string,
	  public Birth : string,
		public Email: string,
		public Odobren : boolean,
		public Role : string
  ){}
}
