import { Component, OnInit, OnDestroy, SimpleChanges, OnChanges } from '@angular/core';
import { Vehicle } from '../../../Model/vehicle';
import { ServiceManager } from '../../../Services/[services].service';
import { AuthService } from '../../../Services/auth.service';
import { HttpService } from '../../../Services/http-service.service';
import { TypeOfVehicle } from '../../../Model/type-of-vehicle'; 
import { PriceList } from '../../../Model/pricelist';
import { ActivatedRoute } from '@angular/router'; 

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.css']
})
export class EditCarComponent implements OnInit,OnChanges,OnDestroy {

  errorText : string;
  types: TypeOfVehicle[];
  typeNameInput : string;
  typeNameSelected : string;
  typeOfVehicle : TypeOfVehicle;
  selectedFile: File[];
  car:Vehicle;
  carId : number;
  private sub : any;

  constructor(private serviceManager : ServiceManager, private authService : AuthService, public httpService: HttpService, private route: ActivatedRoute) {
    this.typeNameInput = "";
    this.typeNameSelected = "";
    this.types = [];
    this.errorText = "";
    this.car = new Vehicle(-1,'','','','',true,-1,-1,[],[],-1);
    this.sub = this.route.params.subscribe(params => {
      this.carId = +params['id']; // (+) converts string 'id' to a number
      this.serviceManager.getCar(this.authService.currentUserToken(),this.carId).subscribe(
        (res: any) => {
                 
            this.car = res;

            this.serviceManager.getPrice(this.authService.currentUserToken(),this.carId).subscribe(
              (res: any) => {
                this.car.Price = res.Price;
              },
              error => 
              {

              }
            )

        },
        error =>{

        });

    
      
      this.httpService.getTypeOfVehicle(this.authService.currentUserToken()).subscribe(
        (res: any) => {
                 
                for(let i=0; i<res.length; i++){
                  this.types.push(res[i]); //use i instead of 0
              }     
        },
        error =>{
    
        });

   }); 

  }

   ngOnChanges(changes: SimpleChanges) {
    if(changes['carId'])
    {
      if(this.carId != undefined)
      {

        
      }
      
    }
    
  }

  ngOnInit() {
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files;
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  newCar()
  {
    if(this.car.Mark.length == 0 || this.car.Model.length == 0 || this.car.Year.length == 0 || this.car.Description.length == 0 || this.typeNameSelected.length == 0)
    {
       this.errorText = "All fields except picture are requiered";
       return false;
    }
    else
    {
      this.errorText = "";
      for(let i=0; i<this.types.length; i++){
        if(this.types[i].Name == this.typeNameSelected)
        {
            this.car.TypeOfVehicleId = this.types[i].Id;
            break;
        }
      }     


      this.serviceManager.putCar(this.car,this.authService.currentUserToken()).subscribe(

        (res : any) => {

          let price : PriceList;
          price  = new PriceList(-1,this.car.Id,'2018.8.5','2020.5.5',this.car.Price);

          this.serviceManager.addNewPrice(price,this.authService.currentUserToken()).subscribe(

            (res: any) =>
            {
                    console.log('ok');
                    
            },
            error =>
            {

            }
            
          )

         /* if(this.selectedFile != undefined)
          {
            this.serviceManager.uploadServicePicture(res._body,this.selectedFile[0],this.authService.currentUserToken()).subscribe
            (
                  (res : any) => {
                          //alert(res._body);                             
                  },
                  error =>
                  {
                          alert(error.json().Message);
                          return false;
                  }
            )
          }*/
              
            alert("Successfully edited vehicle");   
            
      },
      error =>
      {
              alert(error.json().Message);
              return false;
      });
    
    }

  }
  
}

  





