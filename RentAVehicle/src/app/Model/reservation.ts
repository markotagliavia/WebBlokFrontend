export class Reservation {
    constructor(
      public serviceName: string,
      public filijalaIn: string,
	  public filijalaOut: string,
	  public vremeIn: DateTime,
	  public vremeOut: DateTime,
	  public adresaIn: string,
	  public adresaOut: string,
	  public ukupnaCena: string,
  ){}
}
