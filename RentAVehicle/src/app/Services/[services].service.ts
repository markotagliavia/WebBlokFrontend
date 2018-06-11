import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { User } from '../Model/user';
import { IdentityUser } from '../Model/identity-user';
import { Service } from '../Model/service'
import { Branch } from '../Model/branch'
import { Vehicle } from '../Model/vehicle'
import { AppUser } from '../Model/app-user';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { PriceList } from '../Model/pricelist';
import { Reservation } from '../Model/reservation';
import { Rate } from '../Model/rate';


@Injectable({
  providedIn: 'root'
})
export class ServiceManager {

  constructor(private http: Http) { }
  
  private extractData(res: Response) {
        let body = res.json();
        return body || [];
    }

  //branch section ----------------------------------------------------------------------------
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

  uploadBranchPicture(branchid: number, file : File, token: string):Observable<any>
    {

        const headers: Headers = new Headers();
        //headers.append('Content-type', 'multipart/form-data');
        let usertoken = `Bearer ${token}`;
        headers.append('Authorization', usertoken);

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;
        let formData:FormData = new FormData();
        formData.append('uploadFile', file, file.name);
        
        return this.http.post(
            `http://localhost:51432/api/Upload/PostBranchImage/${branchid}`,
            formData, opts);
       
    }
    //end of branch section ----------------------------------------------------------------------------

    //service section ----------------------------------------------------------------------------
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

  putService(serviceNovi : Service, token: string) : Observable<any>
  {
    const headers: Headers = new Headers();
    headers.append('Content-type', 'application/json');
    let usertoken = `Bearer ${token}`;
    headers.append('Authorization', usertoken);

    const opts: RequestOptions = new RequestOptions();
    opts.headers = headers;

    return this.http.put(
        `http://localhost:51432/api/Services/PutService/${serviceNovi.Id}`
        ,
        JSON.stringify({
          Id: serviceNovi.Id,
          Name: serviceNovi.Name, 
          Email: serviceNovi.Email,
          Description: serviceNovi.Description,
          Contact: serviceNovi.Contact,
          AppUserId: serviceNovi.AppUserId,
          Path: serviceNovi.Path,
          Approved: serviceNovi.Approved,
          AverageMark: serviceNovi.AverageMark
        }), opts);
  }

  approveService(service : Service, token: string) : Observable<any>
  {
    const headers: Headers = new Headers();
    headers.append('Content-type', 'application/json');
    let usertoken = `Bearer ${token}`;
    headers.append('Authorization', usertoken);

    const opts: RequestOptions = new RequestOptions();
    opts.headers = headers;

    return this.http.put(
        `http://localhost:51432/api/Services/ApproveService/${service.Id}`,
        JSON.stringify({
          Id: service.Id,
          Name: service.Name, 
          Email: service.Email,
          Description: service.Description,
          Contact: service.Contact,
          AppUserId: service.AppUserId,
          Path: service.Path,
          Approved: true,
          AverageMark: service.AverageMark
        })
       , opts);
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

  getService(token: string, serviceId : number) : any
  {
    const headers: Headers = new Headers();
    headers.append('Content-type', 'application/json');
    let usertoken = `Bearer ${token}`;
    headers.append('Authorization', usertoken);

    const opts: RequestOptions = new RequestOptions();
    opts.headers = headers;
    var url = `http://localhost:51432/api/Services/GetService/${serviceId}`;
    return this.http.get(url, opts).pipe(map((res: Response) => this.extractData(res)));
  }

  deleteService(service: Service, token: string) : Observable<any>
  {
    const headers: Headers = new Headers();
    headers.append('Content-type', 'application/json');
    let usertoken = `Bearer ${token}`;
    headers.append('Authorization', usertoken);

    const opts: RequestOptions = new RequestOptions();
    opts.headers = headers;

    return this.http.delete(
        `http://localhost:51432/api/Services/DeleteService/${service.Id}`
        , opts);
  }

  uploadServicePicture(serviceid: number, file : File, token: string):Observable<any>
    {

        const headers: Headers = new Headers();
        //headers.append('Content-type', 'multipart/form-data');
        let usertoken = `Bearer ${token}`;
        headers.append('Authorization', usertoken);

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;
        let formData:FormData = new FormData();
        formData.append('uploadFile', file, file.name);
        
        return this.http.post(
            `http://localhost:51432/api/Upload/PostServiceImage/${serviceid}`,
            formData, opts);
       
    }


    //end of service section ----------------------------------------------------------------------------


  //cars section ----------------------------------------------------------------------------
  addNewCar(car : Vehicle,id : number,  token : string):Observable<any>
  {
    const headers: Headers = new Headers();
    headers.append('Content-type', 'application/json');
    let usertoken = `Bearer ${token}`;
    headers.append('Authorization', usertoken);

    const opts: RequestOptions = new RequestOptions();
    opts.headers = headers;
    return this.http.post(
        'http://localhost:51432/api/Vehicles/PostVehicle',
        JSON.stringify({
          Id: car.Id,
          Mark: car.Mark,
          Avaliable : car.Available,
          Model: car.Model,
          Description: car.Description,
          Year : car.Year,
          TypeOfVehicleId: car.TypeOfVehicleId,
          ServiceId: car.ServiceId
        }), opts);
  }

  addNewPrice(price : PriceList, token : string) : Observable<any>
  {
    const headers: Headers = new Headers();
    headers.append('Content-type', 'application/json');
    let usertoken = `Bearer ${token}`;
    headers.append('Authorization', usertoken);

    const opts: RequestOptions = new RequestOptions();
    opts.headers = headers;
    return this.http.post(
      'http://localhost:51432/api/PriceLists/PostPriceList',
      JSON.stringify({
        Id: price.Id,
        VehicleId: price.VehicleId,
        StartDate : price.StartDate,
        EndDate : price.EndDate,
        Price : price.Price
      }), opts); 
  }

  putCar(car: Vehicle, token: string) : Observable<any>
  {
    const headers: Headers = new Headers();
    headers.append('Content-type', 'application/json');
    let usertoken = `Bearer ${token}`;
    headers.append('Authorization', usertoken);

    const opts: RequestOptions = new RequestOptions();
    opts.headers = headers;

    return this.http.put(
        `http://localhost:51432/api/Vehicles/PutVehicle/${car.Id}`
        ,
        JSON.stringify({
          Id: car.Id,
          Mark: car.Mark,
          Avaliable : car.Available,
          Model: car.Model,
          Description: car.Description,
          Year : car.Year,
          TypeOfVehicleId: car.TypeOfVehicleId,
          ServiceId: car.ServiceId
        }), opts);
  }

  getCars(token: string): Observable<any>
  {
    const headers: Headers = new Headers();
    headers.append('Content-type', 'application/json');
    let usertoken = `Bearer ${token}`;
    headers.append('Authorization', usertoken);

    const opts: RequestOptions = new RequestOptions();
    opts.headers = headers;
    var url = 'http://localhost:51432/api/Vehicles/GetAllVehicles';
    return this.http.get(url, opts).pipe(map((res: Response) => this.extractData(res)));
  }

  getCarsPaginigWithFilter(token: string, pageNumber : number, pageSize : number
    ,manuName : string,modelName : string, year : string, fromPrice : number, toPrice : number, type : string, serviceId : number): Observable<any>
    {
      const headers: Headers = new Headers();
      headers.append('Content-type', 'application/x-www-form-urlencoded');
      let usertoken = `Bearer ${token}`;
      headers.append('Authorization', usertoken);
  
      const opts: RequestOptions = new RequestOptions();
      opts.headers = headers;
      var url = `http://localhost:51432/api/Vehicles/PaginationWithFilter?pageNumber=${pageNumber}&pageSize=${pageSize}&manuName=${manuName}&modelName=${modelName}&year=${year}&fromPrice=${fromPrice}&toPrice=${toPrice}&type=${type}&serviceId=${serviceId}`;
      return this.http.get(url, opts).pipe(map((res: Response) => this.extractData(res)));
    }
  
    getPaginationWithFilterCount(token: string, pageNumber : number, pageSize : number
      ,manuName : string,modelName : string, year : string, fromPrice : number, toPrice : number, type : string, serviceId : number)
    {
      const headers: Headers = new Headers();
      headers.append('Content-type', 'application/x-www-form-urlencoded');
      let usertoken = `Bearer ${token}`;
      headers.append('Authorization', usertoken);
  
      const opts: RequestOptions = new RequestOptions();
      opts.headers = headers;
      var url = `http://localhost:51432/api/Vehicles/PaginationWithFilterCount?pageNumber=${pageNumber}&pageSize=${pageSize}&manuName=${manuName}&modelName=${modelName}&year=${year}&fromPrice=${fromPrice}&toPrice=${toPrice}&type=${type}&serviceId=${serviceId}`;
      return this.http.get(url, opts).pipe(map((res: Response) => this.extractData(res)));
    }

  getPrice(token: string, carId : number) : Observable<any>
  {
    const headers: Headers = new Headers();
    headers.append('Content-type', 'application/json');
    let usertoken = `Bearer ${token}`;
    headers.append('Authorization', usertoken);

    const opts: RequestOptions = new RequestOptions();
    opts.headers = headers;
    var url = `http://localhost:51432/api/Vehicles/GetPrice/${carId}`;
    return this.http.get(url, opts).pipe(map((res: Response) => this.extractData(res)));
  }

  

  getCar(token: string, carId : number) : any
  {
    const headers: Headers = new Headers();
    headers.append('Content-type', 'application/json');
    let usertoken = `Bearer ${token}`;
    headers.append('Authorization', usertoken);

    const opts: RequestOptions = new RequestOptions();
    opts.headers = headers;
    var url = `http://localhost:51432/api/Vehicles/GetVehicle/${carId}`;
    return this.http.get(url, opts).pipe(map((res: Response) => this.extractData(res)));
  }

  deleteCar(car : Vehicle, token: string) : Observable<any>
  {
    const headers: Headers = new Headers();
    headers.append('Content-type', 'application/json');
    let usertoken = `Bearer ${token}`;
    headers.append('Authorization', usertoken);

    const opts: RequestOptions = new RequestOptions();
    opts.headers = headers;

    return this.http.delete(
        `http://localhost:51432/api/Vehicles/DeleteVehicle/${car.Id}`
        , opts);
  }
    //end of cars section ----------------------------------------------------------------------------
    //reservation section ----------------------------------------------------------------------------
  checkReservation(reservation : Reservation, token: string)
  {
    const headers: Headers = new Headers();
    headers.append('Content-type', 'application/json');
    let usertoken = `Bearer ${token}`;
    headers.append('Authorization', usertoken);

    const opts: RequestOptions = new RequestOptions();
    opts.headers = headers;

    return this.http.post(
      `http://localhost:51432/api/Reservations/CheckReservation`
      ,
      JSON.stringify({
        Id: reservation.Id,
        VehicleId : reservation.VehicleId,
        StartDate : reservation.StartDate,
        EndDate : reservation.EndDate,
        AppUserId : reservation.AppUserId,
        TotalPrice : reservation.TotalPrice,
        Expired : reservation.Expired
      }), opts);
  }

  checkReservationEdit(reservation : Reservation, token: string)
  {
    const headers: Headers = new Headers();
    headers.append('Content-type', 'application/json');
    let usertoken = `Bearer ${token}`;
    headers.append('Authorization', usertoken);

    const opts: RequestOptions = new RequestOptions();
    opts.headers = headers;

    return this.http.post(
      `http://localhost:51432/api/Reservations/CheckReservationEdit`
      ,
      JSON.stringify({
        Id: reservation.Id,
        VehicleId : reservation.VehicleId,
        StartDate : reservation.StartDate,
        EndDate : reservation.EndDate,
        AppUserId : reservation.AppUserId,
        TotalPrice : reservation.TotalPrice,
        Expired : reservation.Expired
      }), opts);
  }

  addReservation(reservation : Reservation, token: string)
  {
    const headers: Headers = new Headers();
    headers.append('Content-type', 'application/json');
    let usertoken = `Bearer ${token}`;
    headers.append('Authorization', usertoken);

    const opts: RequestOptions = new RequestOptions();
    opts.headers = headers;

    return this.http.post(
      `http://localhost:51432/api/Reservations/PostReservation`
      ,
      JSON.stringify({
        Id: reservation.Id,
        VehicleId : reservation.VehicleId,
        StartDate : reservation.StartDate,
        EndDate : reservation.EndDate,
        AppUserId : reservation.AppUserId,
        TotalPrice : reservation.TotalPrice,
        Expired : reservation.Expired,
        BranchReservations : reservation.BranchReservations,
      }), opts);
  }


  editReservation(reservation : Reservation, token: string)
  {
    const headers: Headers = new Headers();
    headers.append('Content-type', 'application/json');
    let usertoken = `Bearer ${token}`;
    headers.append('Authorization', usertoken);

    const opts: RequestOptions = new RequestOptions();
    opts.headers = headers;

    return this.http.put(
      `http://localhost:51432/api/Reservations/PutReservation/${reservation.Id}`
      ,
      JSON.stringify({
        Id: reservation.Id,
        VehicleId : reservation.VehicleId,
        StartDate : reservation.StartDate,
        EndDate : reservation.EndDate,
        AppUserId : reservation.AppUserId,
        TotalPrice : reservation.TotalPrice,
        Expired : reservation.Expired,
        BranchReservations : reservation.BranchReservations,
      }), opts);
  }

  getReservationsUser(id : number, token : string)
  {
    const headers: Headers = new Headers();
    headers.append('Content-type', 'application/json');
    let usertoken = `Bearer ${token}`;
    headers.append('Authorization', usertoken);

    const opts: RequestOptions = new RequestOptions();
    opts.headers = headers;

    return this.http.get(
      `http://localhost:51432/api/Reservations/GetUserReservation/${id}`
      ,opts
    ).pipe(map((res: Response) => this.extractData(res)));
  }

  getReservation(id : number, token : string)
  {
    const headers: Headers = new Headers();
    headers.append('Content-type', 'application/json');
    let usertoken = `Bearer ${token}`;
    headers.append('Authorization', usertoken);

    const opts: RequestOptions = new RequestOptions();
    opts.headers = headers;
    return this.http.get(
      `http://localhost:51432/api/Reservations/GetReservation/${id}`
      ,opts
    ).pipe(map((res: Response) => this.extractData(res)));
  }

  deleteReservation(id: number, token:string)
  {
    const headers: Headers = new Headers();
    headers.append('Content-type', 'application/json');
    let usertoken = `Bearer ${token}`;
    headers.append('Authorization', usertoken);

    const opts: RequestOptions = new RequestOptions();
    opts.headers = headers;
    return this.http.delete(
      `http://localhost:51432/api/Reservations/DeleteReservation/${id}`
      ,opts
    ).pipe(map((res: Response) => this.extractData(res)));
  }
    //end of reservation section ----------------------------------------------------------------------------
    //comments section ----------------------------------------------------------------------------
    addNewRate(rate: Rate, token: string)
    {
      const headers: Headers = new Headers();
      headers.append('Content-type', 'application/json');
      let usertoken = `Bearer ${token}`;
      headers.append('Authorization', usertoken);
  
      const opts: RequestOptions = new RequestOptions();
      opts.headers = headers;
  
      return this.http.post(
        `http://localhost:51432/api/Rates/PostRate`
        ,
        JSON.stringify({
          Id: rate.Id,
          Point : rate.Point,
          Comment : rate.Comment,
          ServiceId : rate.ServiceId,
          AppUserId : rate.AppUserId
        }), opts);
  
    }
  
    allRatesService(serviceId :number, token : string )
    {
      const headers: Headers = new Headers();
      headers.append('Content-type', 'application/json');
      let usertoken = `Bearer ${token}`;
      headers.append('Authorization', usertoken);
  
      const opts: RequestOptions = new RequestOptions();
      opts.headers = headers;
  
      return this.http.get(
        `http://localhost:51432/api/Rates/GetAllRatesService/${serviceId}`
        ,opts
      ).pipe(map((res: Response) => this.extractData(res)));
    }
  
    canLeaveComment(userId: number,serviceId :number, token : string )
    {
      const headers: Headers = new Headers();
      headers.append('Content-type', 'application/json');
      let usertoken = `Bearer ${token}`;
      headers.append('Authorization', usertoken);
  
      const opts: RequestOptions = new RequestOptions();
      opts.headers = headers;
  
      return this.http.get(
        `http://localhost:51432/api/Rates/CanLeaveComment?id=${userId}&serviceId=${serviceId}`
        ,opts
      );
    }
  
    editRate(rate : Rate, token: string)
    {
      const headers: Headers = new Headers();
      headers.append('Content-type', 'application/json');
      let usertoken = `Bearer ${token}`;
      headers.append('Authorization', usertoken);
  
      const opts: RequestOptions = new RequestOptions();
      opts.headers = headers;
  
      return this.http.put(
        `http://localhost:51432/api/Rates/PutRate/${rate.Id}`
        ,
        JSON.stringify({
          Id: rate.Id,
          Point : rate.Point,
          Comment : rate.Comment,
          ServiceId : rate.ServiceId,
          AppUserId : rate.AppUserId
        }), opts);
    }
  
    deleteRate(rate : Rate, token: string)
    {
      const headers: Headers = new Headers();
      headers.append('Content-type', 'application/json');
      let usertoken = `Bearer ${token}`;
      headers.append('Authorization', usertoken);
  
      const opts: RequestOptions = new RequestOptions();
      opts.headers = headers;
  
      return this.http.delete(
        `http://localhost:51432/api/Rates/DeleteRate/${rate.Id}`
        ,opts
      );
    }
  
    //end of comments section ----------------------------------------------------------------------------
}

