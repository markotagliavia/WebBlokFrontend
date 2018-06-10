import { Component, OnInit, Injectable,Input, OnChanges, SimpleChanges } from '@angular/core';
import { Reservation } from '../../../Model/reservation';
import {Vehicle} from '../../../Model/vehicle';
import {AuthService} from '../../../Services/auth.service';
import {ServiceManager} from '../../../Services/[services].service';
import { getLocaleDateTimeFormat } from '@angular/common';
import { Branch } from '../../../Model/branch';
import { ActivatedRoute } from '@angular/router';
import { BranchReservation } from '../../../Model/branch-reservation';


@Injectable()
@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit{

  carId : number; 
  car : Vehicle;
  errorText : string;
  reservation : Reservation;
  branchfrom: string;
  branchto: string;
  branches: Branch[];
  private sub : any;
  addressPickup : string;
  addressRelease : string;
  price : number;

  constructor(private authService: AuthService,private serviceManager: ServiceManager, private route: ActivatedRoute) { 
    this.addressPickup = "";
    this.addressRelease = "";
    this.price = 0;
    this.errorText = "";
    this.branchfrom = '';
    this.branchto = '';
    this.branches = [];
    this.reservation = new Reservation(-1,false,'','',0,this.authService.currentUserId(),-1,[]);
    this.sub = this.route.params.subscribe(params => {
      this.carId = +params['id']; // (+) converts string 'id' to a number
      this.serviceManager.getCar(this.authService.currentUserToken(),this.carId).subscribe(
        (res: any) => {
                 
            this.car = res;

            this.serviceManager.getBranches(this.authService.currentUserToken()).subscribe(
              (res: any) => {
                        
                      for(let i=0; i<res.length; i++){
                        if(this.car.ServiceId == res[i].ServiceId) 
                        {
                          this.branches.push(res[i]); //use i instead of 0
                        }
                    }     
              },
              error =>{
                console.log(error);
              }
            )

        },
        error =>{}
      )
        });
    
  }

  ngOnInit()
  {

  }

  

  submitRes()
  {
    //to do kreiraj objkte branch
    this.reservation.VehicleId = this.car.Id;
    let branch1 : Branch;
    let branch2 : Branch;
    this.branches.forEach(element => {

        if(element.Name == this.branchfrom)
        {
          branch1 = element;

        }
        if(element.Name == this.branchto)
        {
          branch2 = element;
  
        }
      
    });
    this.reservation.BranchReservations.push(new BranchReservation(branch1.Id,-1,true));
    this.reservation.BranchReservations.push(new BranchReservation(branch2.Id,-1,false));
    if(this.branchfrom.length == 0 || this.branchto.length  == 0 || this.reservation.StartDate.length == 0 || this.reservation.EndDate.length == 0)
    {
      this.errorText = "All fields are requiered";
      return false;
    }
    else
    {
      let datereservation = new Date(this.reservation.StartDate);
      let dateback = new Date(this.reservation.EndDate);

      if(datereservation > dateback)
      {
        this.errorText = "Start date is bigger than end date";
        return false;
      }
      this.errorText = "";
      this.serviceManager.addReservation(this.reservation,this.authService.currentUserToken()).subscribe
      (
            (res: any) =>
            {
                        alert("Reserved");
            },
            error =>
            {
                        alert("Car is not available");
            }
      )
    }
  }

  checkRes()
  {
    //to do kreiraj objkte branch
    this.reservation.VehicleId = this.car.Id;
    if(this.branchfrom.length == 0 || this.branchto.length  == 0 || this.reservation.StartDate.length == 0 || this.reservation.EndDate.length == 0)
    {
      this.errorText = "All fields are requiered";
      return false;
    }
    else
    {
      let datereservation = new Date(this.reservation.StartDate);
      let dateback = new Date(this.reservation.EndDate);

      if(datereservation > dateback)
      {
        this.errorText = "Start date is bigger than end date";
        return false;
      }

      this.errorText = "";

      //tu samo sracunaj cenu
      this.serviceManager.checkReservation(this.reservation,this.authService.currentUserToken()).subscribe
      (
        (res:any) =>
        {
              this.price = res._body;
        },
        error =>
        {
              alert("Car is not available");
        }
      )
    }
  }

  changeSelectionPickup()
  {
    this.branches.forEach(element => {
      
        if(element.Name == this.branchfrom)
        {
          this.addressPickup = element.Address;

        }

    });
    
  }

  changeSelectionRelease()
  {
    this.branches.forEach(element => {
      
      if(element.Name == this.branchto)
      {
        this.addressRelease = element.Address;

      }

  });

  }

}
