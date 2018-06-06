import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { User } from '../Model/user';
import { IdentityUser } from '../Model/identity-user';
import { AppUser } from '../Model/app-user';
import { TypeOfVehicle} from '../Model/type-of-vehicle';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
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
        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        //let bodyURL = new URLSearchParams();
        //bodyURL.set('username', user.username);
        //bodyURL.set('password', user.password);
        //bodyURL.set('grant_type', "password");

        //let body = bodyURL.toString();

		//console.log(body);
        return this.http.post(
            'http://localhost:51432/oauth/token',
            `username=${user.username}&password=${user.password}&grant_type=password`, opts);
    }
	
	  register(user: IdentityUser) {
	  
	    console.log(`Stiglo: ${user.username} i : ${user.password} i ${user.name} i ${user.surname} i ${user.birth} i ${user.contact} i ${user.email}`);
        
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        return this.http.post(
            'http://localhost:51432/api/Account/Register',
            JSON.stringify({
                Username: user.username,
                Name: user.name,
                Surname: user.surname,
                Email: user.email,
                Password: user.password,
                Contact: user.contact,
                Birth: user.birth,
                ConfirmPassword: user.confirmPassword
            }), opts);
        
    }

    getUserOnSession(username: string, token: string): Observable<any> {
        const headers: Headers = new Headers();
        headers.append('Content-type', 'application/json');
        let usertoken = `Bearer ${token}`;
        headers.append('Authorization', usertoken);

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;
        var url = `http://localhost:51432/api/AppUser/GetAppUser/${username}`;
        return this.http.get(url, opts).pipe(map((res: Response) => this.extractData(res)));
    }

    createTypeOfVehicle(type : TypeOfVehicle, token: string): Observable<any>
    {
        const headers: Headers = new Headers();
        headers.append('Content-type', 'application/json');
        let usertoken = `Bearer ${token}`;
        headers.append('Authorization', usertoken);

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;
        return this.http.post(
            'http://localhost:51432/api/TypeOfVehicle/PostTypeOfVehicle',
            JSON.stringify({
                Id: type.Id,
                Name: type.Name
            }), opts);
    }

    getTypeOfVehicle(token: string): Observable<any>
    {
        return this.http.get('http://localhost:51432/api/TypeOfVehicle/Register');
    }
}
