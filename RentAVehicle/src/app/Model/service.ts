
export class Service {
    constructor(
        public Id: number,
        public Name: string, 
        public Email: string,
        public Description: string,
        public Contact: string,
        public AppUserId: number,
        public Path: string,
        public Approved: boolean,
        public AverageMark: number
    ){}
    }