export class CurrentUser {
    constructor(
        public login: boolean,
        public username: string,
        public name: string,
        public surname: string,
        public role: string,
        public token: string,
        public contact: string,
        public birth : string,
        public email: string,
        public password: string,
        public id: number
    ){}
}
