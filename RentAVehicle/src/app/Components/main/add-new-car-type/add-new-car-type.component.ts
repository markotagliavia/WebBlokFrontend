import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../Services/http-service.service';
import { AuthService } from '../../../Services/auth.service'; 
import { TypeOfVehicle } from '../../../Model/type-of-vehicle'; 

@Component({
  selector: 'app-add-new-car-type',
  templateUrl: './add-new-car-type.component.html',
  styleUrls: ['./add-new-car-type.component.css']
})
export class AddNewCarTypeComponent implements OnInit {

  types: string[];
	errorText : string;
	typeNameInput : string;
  typeNameSelected : string;
  typeOfVehicle : TypeOfVehicle;

  constructor(public httpService: HttpService,private authService: AuthService) {
	this.errorText = "";
	this.typeNameInput = "";
  this.typeNameSelected = "";
  this.types = ['kola','motor']; //to do uraditi zahtev za dobijanje...
  }

  
  ngOnInit() {
  }

  newType()
  {
	  if(this.typeNameInput.length == 0)
	  {
		  this.errorText = "You must enter type name";
		  return false;
	  }
	  else
	  {
		  this.errorText = "";
	  }
    
    this.typeOfVehicle = new TypeOfVehicle(0,this.typeNameInput);

    this.httpService.createTypeOfVehicle(this.typeOfVehicle,this.authService.currentUserToken()).subscribe(
			(res: any) => {


				alert("Successfully added new type " + this.typeNameInput);
	
				},
			error => {
		
				console.log("ERROR " + error);

				this.errorText = error;
			}
		)

    this.typeNameInput = '';
    return false;
  }
  
  updateType()
  {
	  
  }
  
  deleteType()
  {
	  
  }
  
}
