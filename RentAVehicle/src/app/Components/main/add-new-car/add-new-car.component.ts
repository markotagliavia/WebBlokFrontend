import { Component, OnInit } from '@angular/core';
import { Car } from '../../../Model/car';

@Component({
  selector: 'app-add-new-car',
  templateUrl: './add-new-car.component.html',
  styleUrls: ['./add-new-car.component.css']
})
export class AddNewCarComponent implements OnInit {

  car : Car;
  errorText : string;

  constructor() {
    this.car = {
      'Id':-1,
      'Manufacturer' : '',
      'Model' : '',
      'Year' : '',
      'Description' : '',
      'Type' : '',
      'Price' : ''
    }
    this.errorText = "";
   }

  ngOnInit() {
  }

  newCar(){
    if(this.car.Manufacturer.length == 0 || this.car.Model.length == 0 || this.car.Year.length == 0 || this.car.Description.length == 0
        || this.car.Type.length == 0 || this.car.Price.length == 0)
    {
       this.errorText = "All fields except picture are requiered";
       return false;
    }
    else
    {
      this.errorText = "";
    }
  }

}
