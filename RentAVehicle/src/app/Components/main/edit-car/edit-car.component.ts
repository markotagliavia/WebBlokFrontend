import { Component, OnInit } from '@angular/core';
import { Car } from '../../../Model/car';

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.css']
})
export class EditCarComponent implements OnInit {

  car : Car;
  errorText : string;

  constructor() {
    this.car = {
      'manufacturer' : '',
      'model' : '',
      'year' : '',
      'description' : '',
      'type' : '',
      'price' : ''
    }
    this.errorText = "";
   }

  ngOnInit() {
  }

  newCar(){
    if(this.car.manufacturer.length == 0 || this.car.model.length == 0 || this.car.year.length == 0 || this.car.description.length == 0
        || this.car.type.length == 0 || this.car.price.length == 0)
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
