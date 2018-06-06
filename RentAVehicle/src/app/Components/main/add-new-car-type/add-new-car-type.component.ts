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

  types: TypeOfVehicle[];
	errorText : string;
	typeNameInput : string;
  typeNameSelected : string;
  typeOfVehicle : TypeOfVehicle;

  constructor(public httpService: HttpService,private authService: AuthService) {
	this.errorText = "";
	this.typeNameInput = "";
  this.typeNameSelected = "";
  this.types = []; //to do uraditi zahtev za dobijanje...
  this.httpService.getTypeOfVehicle(this.authService.currentUserToken()).subscribe(
    (res: any) => {
             
            for(let i=0; i<res.length; i++){
              this.types.push(res[i]); //use i instead of 0
          }     
    },
    error =>{

    }
    
  )
  
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
		
				alert(error.json().Message);

				this.errorText = error.json().Message;
			}
    )
    this.types = [];
    this.httpService.getTypeOfVehicle(this.authService.currentUserToken()).subscribe(
      (res: any) => {
               
              for(let i=0; i<res.length; i++){
                this.types.push(res[i]); //use i instead of 0
            }     
      },
      error =>{
  
      }
      
    )

    this.typeNameInput = '';
    return false;
  }
  
  updateType()
  {
    if(this.typeNameInput.length == 0 || this.typeNameSelected.length == 0 ){
      this.errorText = "All fields are required";
      return false;		
      }

      for(let i=0; i<this.types.length; i++){
        
        if(this.types[i].Name == this.typeNameSelected )
        {
          this.httpService.putTypeOfVehicle(this.types[i],this.typeNameInput,this.authService.currentUserToken()).subscribe(

            (res: any) => {
                   
              alert('Successfully modify type');
              this.types = [];
              this.typeNameInput = '';
              this.httpService.getTypeOfVehicle(this.authService.currentUserToken()).subscribe(
                (res: any) => {
                        
                        for(let i=0; i<res.length; i++){
                          this.types.push(res[i]); //use i instead of 0
                      }     
                },
                error =>{
                  alert(error.json().Message);
                })
                 
            },
            error =>{
                  alert(error.json().Message);
            }
    
    
          )

          break;
        }
        
      }     
      
      return false;
  }
  
  deleteType()
  {

    if(this.typeNameSelected.length == 0 ){
      this.errorText = "Type must be selected";
      return false;		
      }

      for(let i=0; i<this.types.length; i++){
        
        if(this.types[i].Name == this.typeNameSelected )
        {
          this.httpService.deleteTypeOfVehicle(this.types[i],this.authService.currentUserToken()).subscribe(

            (res: any) => {
                   
              alert('Successfully deleted type');
              this.types = [];
              this.httpService.getTypeOfVehicle(this.authService.currentUserToken()).subscribe(
                (res: any) => {
                        
                        for(let i=0; i<res.length; i++){
                          this.types.push(res[i]); //use i instead of 0
                      }     
                },
                error =>{
                  alert(error.json().Message);
                })
                 
            },
            error =>{
                  alert(error.json().Message);
            }
    
    
          )

          break;
        }
        
      }     
      
      return false;
	  
  }
  
}
