export class CurrentUser {
    constructor(
        public login: boolean,
        public username: string,
        public name: string,
        public surname: string,
        public role: string,
        public token: string,
        public id: number
    ){}
}
