export class CurrentUser {

    constructor(
        public username: string,
        public fullname: string,
        public role: string,
        public token: string,
        public id: number
    ){}
}
