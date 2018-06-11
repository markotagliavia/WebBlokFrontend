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

  numberOfCarsPerPage = 3;
  numberOfCars : number;
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
    this.carsForPrikaz = [];
    this.typeNameSelected = "All";
    this.types = [];
    this.manuNameInput = "";
    this.modelNameInput = "";
    this.yearInput = "";
    this.fromPriceInput = 0;
    this.toPriceInput = 9999999; 

    this.serviceManager.getPaginationWithFilterCount(this.authService.currentUserToken(), 1, this.numberOfCarsPerPage, "*", "*", "*", 0, 999999, "All", -1).subscribe(
      (res: any) => {
               this.numberOfCars = res;
               this.totalNumber = this.numberOfCars;
               this.totalPages = this.totalNumber / this.numberOfCarsPerPage;
               for (var index = 1; index <= (this.totalPages + 1); index++) {
                 this.pageNumbers.push(index);
               }
               
               this.serviceManager.getCarsPaginigWithFilter(this.authService.currentUserToken(), 1, this.numberOfCarsPerPage, "*", "*", "*", 0, 999999, "All", -1).subscribe(
                (res: any) => {
                  for(let i=0; i<res.length; i++){
                      this.carsForPrikaz.push(res[i]);
                  }
          
                  },
                  error =>{ 
                  });
      },
      error =>{
         console.log(error);
         
      });
  }

  receiveMessage($event) {
    this.carsForPrikaz = [];
    this.pageNumbers = [];
    this.serviceManager.getPaginationWithFilterCount(this.authService.currentUserToken(), 1, this.numberOfCarsPerPage, "*", "*", "*", 0, 999999, "All", -1).subscribe(
      (res: any) => {
               this.numberOfCars = res;
               this.totalNumber = this.numberOfCars;
               this.totalPages = this.totalNumber / this.numberOfCarsPerPage;
               for (var index = 1; index <= (this.totalPages + 1); index++) {
                 this.pageNumbers.push(index);
               }
               
               this.serviceManager.getCarsPaginigWithFilter(this.authService.currentUserToken(), 1, this.numberOfCarsPerPage, "*", "*", "*", 0, 999999, "All", -1).subscribe(
                (res: any) => {
                  for(let i=0; i<res.length; i++){
                      this.carsForPrikaz.push(res[i]);
                  }
          
                  },
                  error =>{ 
                  });
      },
      error =>{
         console.log(error);
         
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
    
  }

  doPaginacija(num : number)
  {
    var yearParam = "";
    var modelParam = "";
    var manuParam = "";
    if(this.manuNameInput == "")
    {
      manuParam = "*";
    }
    else 
    {
      manuParam = this.manuNameInput;
    }
    if(this.modelNameInput == "")
    {
      modelParam = "*";
    }
    else 
    {
      modelParam = this.modelNameInput;
    }
    if(this.yearInput == "")
    {
      yearParam = "*";
    }
    else 
    {
      yearParam = this.yearInput;
    }

      this.carsForPrikaz = [];
      this.pageNumbers = [];
      this.serviceManager.getPaginationWithFilterCount(this.authService.currentUserToken(), num, this.numberOfCarsPerPage, manuParam, modelParam, yearParam, this.fromPriceInput, this.toPriceInput, this.typeNameSelected, -1).subscribe(
        (res: any) => {
                 this.numberOfCars = res;
                 this.totalNumber = this.numberOfCars;
                 this.totalPages = this.totalNumber / this.numberOfCarsPerPage;
                 for (var index = 1; index <= (this.totalPages + 1); index++) {
                   this.pageNumbers.push(index);
                 }
                 
                 this.serviceManager.getCarsPaginigWithFilter(this.authService.currentUserToken(), num, this.numberOfCarsPerPage, manuParam, modelParam, yearParam, this.fromPriceInput, this.toPriceInput, this.typeNameSelected, -1).subscribe(
                  (res: any) => {
                    for(let i=0; i<res.length; i++){
                        this.carsForPrikaz.push(res[i]);
                    }
            
                    },
                    error =>{ 
                    });
        },
        error =>{
           console.log(error);
           
        });
  }

}
