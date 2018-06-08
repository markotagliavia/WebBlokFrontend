export class AppUser {
    constructor(
			public Id : number,
      public Name: string,
      public Surname: string,
	  	public Username: string,
	  	public Contact: string,
	  	public BirthDate : string,
			public Email: string,
			public Approved: boolean,
			public CreateService: boolean,
			public LoggedIn: boolean,
      public Path: string,
			public Role : string 
  ){}
}
