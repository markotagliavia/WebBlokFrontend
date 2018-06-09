import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../Services/http-service.service';
import { AuthService } from '../../../Services/auth.service'; 
import { TypeOfVehicle } from '../../../Model/type-of-vehicle'; 
import { Service } from '../../../Model/service';
import { Vehicle } from '../../../Model/vehicle';
import { ServiceManager } from '../../../Services/[services].service';

@Component({
  selector: 'app-cars-main',
  templateUrl: './cars-main.component.html',
  styleUrls: ['./cars-main.component.css']
})
export class CarsMainComponent implements OnInit {

  cars: Vehicle[];
  types: TypeOfVehicle[];
	typeNameInput : string;
  typeNameSelected : string;
  typeOfVehicle : TypeOfVehicle;

  constructor(public httpService: HttpService,private authService: AuthService, private serviceManager : ServiceManager) { 
    this.cars = [];
    this.typeNameInput = "";
    this.typeNameSelected = "";
    this.types = []; 
    this.httpService.getTypeOfVehicle(this.authService.currentUserToken()).subscribe(
      (res: any) => {
               
              for(let i=0; i<res.length; i++){
                this.types.push(res[i]);
            }     
      },
      error =>{ 
      });

      this.serviceManager.getCars(this.authService.currentUserToken()).subscribe(
        (res: any) => {
                 
                for(let i=0; i<res.length; i++){
                  this.cars.push(res[i]);
              }     
        },
        error =>{ 
        });
  }

  ngOnInit() {
  }

}
