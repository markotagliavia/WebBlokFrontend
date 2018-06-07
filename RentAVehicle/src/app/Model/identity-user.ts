export class IdentityUser {
    constructor(
        public name: string,
        public surname: string,
        public username: string,
        public password: string,
        public contact: string,
        public birth : string,
        public email: string,
        public createService : boolean,
        public confirmPassword: string
    ){}
}
