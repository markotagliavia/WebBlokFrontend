import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { User } from '../Model/user';
import { IdentityUser } from '../Model/identity-user';
import { AppUser } from '../Model/app-user';
import { Observable } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: Http) { }
  
  private extractData(res: Response) {
        let body = res.json();
        return body || [];
    }
	
  logIn(user: User): Observable<any> {
	  
	    console.log(`Stiglo: ${user.username} i : ${user.password}`);
        const headers: Headers = new Headers();
        headers.append('Content-type', 'application/x-www-form-urlencoded');
		headers.append('Access-Control-Allow-Origin','Origin, Content-Type, X-Auth-Token');



        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        let bodyURL = new URLSearchParams();
        bodyURL.set('username', user.username);
        bodyURL.set('password', user.password);
        bodyURL.set('grant_type', "password");

        let body = bodyURL.toString();

        return this.http.post(
            'http://localhost:51432/oauth/token/',
            body, opts);
    }
	
	  register(user: AppUser) {
	  
	    console.log(`Stiglo: ${user.username} i : ${user.password} i ${user.name} i ${user.surname} i ${user.birth} i ${user.contact} i ${user.email}`);
		return false;
    }
}
