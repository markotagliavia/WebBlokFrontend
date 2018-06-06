import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { User } from '../Model/user';
import { IdentityUser } from '../Model/identity-user';
import { Service } from '../Model/service'
import { AppUser } from '../Model/app-user';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ServiceManager {

  constructor(private http: Http) { }
  
  private extractData(res: Response) {
        let body = res.json();
        return body || [];
    }


  addNewService(service : Service,id : number,  token : string):Observable<any>
  {
    const headers: Headers = new Headers();
    headers.append('Content-type', 'application/json');
    let usertoken = `Bearer ${token}`;
    headers.append('Authorization', usertoken);

    const opts: RequestOptions = new RequestOptions();
    opts.headers = headers;
    return this.http.post(
        'http://localhost:51432/api/Services/PostService',
        JSON.stringify({
          Id: service.Id,
          Name: service.Name, 
          Email: service.Email,
          Description: service.Description,
          Contact: service.Contact,
          AppUserId: id,
          Path: service.Path,
          Approved: false,
          AverageMark: 0
        }), opts);
  }
}
