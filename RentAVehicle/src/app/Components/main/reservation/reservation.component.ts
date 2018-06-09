import { Component, OnInit, Injectable,Input, OnChanges, SimpleChanges } from '@angular/core';
import { Reservation } from '../../../Model/reservation';
import {Vehicle} from '../../../Model/vehicle';
import {AuthService} from '../../../Services/auth.service';
import {ServiceManager} from '../../../Services/[services].service';
import { getLocaleDateTimeFormat } from '@angular/common';
import { Branch } from '../../../Model/branch';


@Injectable()
@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnChanges {

  @Input() vehicle : Vehicle; 
  errorText : string;
  reservation : Reservation;
  brachfrom: string;
  branchto: string;
  branches: Branch[];

  constructor(private authService: AuthService,private serviceManager: ServiceManager) { 
    this.errorText = "";
    this.brachfrom = '';
    this.branchto = '';
    this.branches = [];
    this.reservation = new Reservation(-1,false,'','',0,this.authService.currentUserId(),-1,[]);
    this.serviceManager.getBranches(this.authService.currentUserToken()).subscribe(

        (res: any) =>
        {

        },
        error => {

        }

    )
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['vehicle'])
    {
      if(this.vehicle != undefined)
      {
        this.serviceManager.getBranches(this.authService.currentUserToken()).subscribe(
          (res: any) => {
                   
                  for(let i=0; i<res.length; i++){
                   if(this.vehicle.ServiceId == res[i].ServiceId) 
                   {
                     this.branches.push(res[i]); //use i instead of 0
                   }
                }     
          },
          error =>{
            console.log(error);
          }
          
        )
      }
      
    }
    
  }

  submitRes()
  {
    //to do kreiraj objkte branch
    this.reservation.VehicleId = this.vehicle.Id;
    if(this.brachfrom.length == 0 || this.branchto.length  == 0 || this.reservation.StartDate || this.reservation.EndDate)
    {
      this.errorText = "All fields are requiered";
      return false;
    }
    else
    {
      this.errorText = "";
    }
  }

}
