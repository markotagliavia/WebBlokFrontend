import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../../../Model/vehicle';

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.css']
})
export class EditCarComponent implements OnInit {

  car : Vehicle;
  errorText : string;

  constructor() {
  this.car = new Vehicle(-1,'','','','',false,-1,-1,[]);

    this.errorText = "";
   }

  ngOnInit() {
  }

  newCar(){
    //izmeni ovde
    if(this.car.Mark.length == 0 || this.car.Model.length == 0 || this.car.Year.length == 0 || this.car.Description.length == 0)
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
