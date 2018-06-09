import { BranchReservation} from './branch-reservation'

export class Reservation {
    constructor(
			public Id : number,
			public Expired : boolean,
			public StartDate : string,
			public EndDate : string,
			public TotalPrice : number,
			public AppUserId : number,
			public VehicleId : number, 
			public BranchReservations : BranchReservation[]  
  ){}
}
