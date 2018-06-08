export class AppUser {
    constructor(
			public Id : number,
      public Name: string,
      public Surname: string,
	  	public Username: string,
	  	public Contact: string,
	  	public Birth : string,
			public Email: string,
			public approved: boolean,
      public createService: boolean,
      public Path: string,
			public Role : string 
  ){}
}
