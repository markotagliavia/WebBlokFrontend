import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { User } from '../Model/user';
import { IdentityUser } from '../Model/identity-user';
import { Service } from '../Model/service'
import { Branch } from '../Model/branch'
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

  createBranch(branch : Branch, token: string): Observable<any>
  {
    const headers: Headers = new Headers();
    headers.append('Content-type', 'application/json');
    let usertoken = `Bearer ${token}`;
    headers.append('Authorization', usertoken);

    const opts: RequestOptions = new RequestOptions();
    opts.headers = headers;
    return this.http.post(
        'http://localhost:51432/api/Branches/PostBranch',
        JSON.stringify({
            Id: branch.Id,
            Name: branch.Name,
            Latitude: branch.Latitude,
            Longitude: branch.Longitude,
            Address: branch.Address,
            ServiceId: branch.ServiceId
        }), opts);
  }

  putBranch(branch: Branch, branchNova : Branch, token: string) : Observable<any>
  {
    const headers: Headers = new Headers();
    headers.append('Content-type', 'application/json');
    let usertoken = `Bearer ${token}`;
    headers.append('Authorization', usertoken);

    const opts: RequestOptions = new RequestOptions();
    opts.headers = headers;

    return this.http.put(
        `http://localhost:51432/api/Branches/PutBranch/${branch.Id}`
        ,
        JSON.stringify({
          Id: branch.Id,
          Name: branchNova.Name,
          Latitude: branchNova.Latitude,
          Longitude: branchNova.Longitude,
          Address: branchNova.Address,
          ServiceId: branch.ServiceId
        }), opts);
  }

  deleteBranch(branch: Branch, token: string) : Observable<any>
  {
    const headers: Headers = new Headers();
    headers.append('Content-type', 'application/json');
    let usertoken = `Bearer ${token}`;
    headers.append('Authorization', usertoken);

    const opts: RequestOptions = new RequestOptions();
    opts.headers = headers;

    return this.http.delete(
        `http://localhost:51432/api/Branches/DeleteBranch/${branch.Id}`
        , opts);
  }

  getBranches(token: string): Observable<any>
  {
    const headers: Headers = new Headers();
    headers.append('Content-type', 'application/json');
    let usertoken = `Bearer ${token}`;
    headers.append('Authorization', usertoken);

    const opts: RequestOptions = new RequestOptions();
    opts.headers = headers;
    var url = 'http://localhost:51432/api/Branches/GetAllBranches';
    return this.http.get(url, opts).pipe(map((res: Response) => this.extractData(res)));
  }

  getServices(token: string): Observable<any>
  {
    const headers: Headers = new Headers();
    headers.append('Content-type', 'application/json');
    let usertoken = `Bearer ${token}`;
    headers.append('Authorization', usertoken);

    const opts: RequestOptions = new RequestOptions();
    opts.headers = headers;
    var url = 'http://localhost:51432/api/Services/GetAllServices';
    return this.http.get(url, opts).pipe(map((res: Response) => this.extractData(res)));
  }
}
