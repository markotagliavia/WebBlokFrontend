import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../../../Services/http-service.service';
import { AuthService } from '../../../Services/auth.service'; 
import { TypeOfVehicle } from '../../../Model/type-of-vehicle'; 
import { Service } from '../../../Model/service';
import { Vehicle } from '../../../Model/vehicle';
import { ServiceManager } from '../../../Services/[services].service';
import { CarUnitComponent } from '../car-unit/car-unit.component'

@Component({
  selector: 'app-cars-main',
  templateUrl: './cars-main.component.html',
  styleUrls: ['./cars-main.component.css']
})
export class CarsMainComponent implements OnInit {


  cars: Vehicle[];
  carsForPrikaz: Vehicle[];
  types: TypeOfVehicle[];
  typeNameSelected : string;
  typeOfVehicle : TypeOfVehicle;

  manuNameInput : string;
  modelNameInput : string;
  yearInput : string;
  fromPriceInput : number;
  toPriceInput : number;

  pageNumber: number = 1;
  totalNumber: number = 0;
  totalPages: number = 1;
  pageNumbers: number[] = [];
 

  constructor(public httpService: HttpService,private authService: AuthService, private serviceManager : ServiceManager) { 
    this.cars = [];
    this.carsForPrikaz = [];
    this.typeNameSelected = "All";
    this.types = [];
    this.manuNameInput = "";
    this.modelNameInput = "";
    this.yearInput = "";
    this.fromPriceInput = 0;
    this.toPriceInput = 9999999; 
  }

  receiveMessage($event) {
    this.cars = [];
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

        this.totalNumber = this.cars.length;
        this.totalPages = this.totalNumber / 3;
        for (var index = 1; index < (this.totalPages + 1); index++) {
          this.pageNumbers.push(index);
        }

    this.serviceManager.getCarsPaginig(this.authService.currentUserToken(), this.pageNumber, 3).subscribe(
      (res: any) => {
        for(let i=0; i<res.length; i++){
          this.carsForPrikaz.push(res[i]);
        }
        /*temp.forEach(element => {
          if (element.ServiceId == this.serviceId) {
            this.carsForPrikaz.push(element);
          }*/

        },
        error =>{ 
        });
    
  }

  /*promenaTipa()
  {
    this.carsForPrikaz = [];
    if(this.typeNameSelected == "All")
    {
      this.carsForPrikaz = this.cars;
    }
    else
    {
      var typeId = -1;
      for(let j = 0; j < this.types.length; j++)
      {
        if(this.types[j].Name == this.typeNameSelected)
        {
          typeId = this.types[j].Id;
        }
      }

      for(let i = 0; i < this.cars.length; i++)
      {
        if(this.cars[i].TypeOfVehicleId == typeId)
        {
          this.carsForPrikaz.push(this.cars[i]);
        }
      }
    }
  }*/

  doPaginacija(num : number)
  {
    //to do
  }

}
