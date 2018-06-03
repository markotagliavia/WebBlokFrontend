export class CurrentUser {
    constructor(
        public username: string,
		public password: string,
        public name: string,
		public surname: string,
        public role: string,
        public token: string,
        public id: number
    ){}
}
