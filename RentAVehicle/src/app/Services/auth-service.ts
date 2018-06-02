import { CurrentUser } from "app/model/current-user";
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Injectable } from "@angular/core";

@Injectable()
export class AuthService {
    
    loggedIn : boolean;

    constructor(private http: Http){
        
    }

    logIn(currentUser: CurrentUser): void{
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }

    logOut(): void{
        localStorage.removeItem("currentUser");
    }

    isLoggedIn(): boolean{
        if(localStorage.getItem("currentUser") !== null)
            return true;
        else
            return false;
    }

    isLoggedOut(): boolean{
        if(localStorage.getItem("currentUser") !== null)
            return false;
        else
            return true;
    }

    isLoggedInRole(role: string): boolean {
        let curretUser = localStorage.getItem("currentUser");
        if ( curretUser !== null){
            let user: CurrentUser = JSON.parse(curretUser);
            if (user.role == role){
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }

    currentUserId(): number {
        let curretUser = localStorage.getItem("currentUser");
        if ( curretUser !== null){
            let user: CurrentUser = JSON.parse(curretUser);
            return user.id;
        }
        else
        {
            return -1;
        }
    }

    currentUserName(): string {
        let currentUser = localStorage.getItem("currentUser");
        if (currentUser !== null) {
            let user: CurrentUser = JSON.parse(currentUser);
            return user.username;
        }
        else {
            return null;
        }
    }

    currentUserToken(): string {
        let currentUser = localStorage.getItem("currentUser");
        if (currentUser !== null) {
            let user: CurrentUser = JSON.parse(currentUser);
            return user.token;
        }
        else {
            return null;
        }
    }

    currentUserRole(): string { 
        let currentUser = localStorage.getItem("currentUser");
        if (currentUser !== null) {
            let user: CurrentUser = JSON.parse(currentUser);
            return user.role;
        }
        else {
            return null;
        }
    }


    changePassword(currentPass: string, newPass: string, confirmPass: string, access_token: string){
       
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');
        let token = `Bearer ${access_token}`;
        headers.append('Authorization', token);

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        return this.http.post(`http://localhost:54042/api/Account/ChangePassword`,
         JSON.stringify({
             OldPassword: currentPass,
             NewPassword: newPass,
             ConfirmPassword: confirmPass
         }), opts);
    }

    
}
