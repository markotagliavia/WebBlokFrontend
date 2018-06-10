import { Component, OnInit, OnDestroy, Injectable, Input } from '@angular/core';
import { Vehicle } from '../../../Model/vehicle';
import { Service } from '../../../Model/service';
import { ServiceManager } from '../../../Services/[services].service';
import { AuthService } from '../../../Services/auth.service';
import { HttpService } from '../../../Services/http-service.service';
import { ActivatedRoute } from '@angular/router'; 
import { TypeOfVehicle } from '../../../Model/type-of-vehicle'; 
import { PriceList } from '../../../Model/pricelist';

@Injectable()
@Component({
  selector: 'app-add-new-car',
  templateUrl: './add-new-car.component.html',
  styleUrls: ['./add-new-car.component.css']
})
export class AddNewCarComponent implements OnInit, OnDestroy {

  types: TypeOfVehicle[];
	errorText : string;
	typeNameInput : string;
  typeNameSelected : string;
  typeOfVehicle : TypeOfVehicle;
  car : Vehicle;
  selectedFile: File[]; 
  serviceId : number;
  service : Service;

  private sub : any;

  constructor(private route: ActivatedRoute,private serviceManager : ServiceManager, private authService : AuthService, public httpService: HttpService) {
    this.typeNameInput = "";
    this.typeNameSelected = "";
    this.types = [];
    this.car = new Vehicle(-1,'','','','',true,-1,-1,[],[],-1);
    this.service = new Service(0,'', '','','',-1,'',false,0);
    this.errorText = "";
      this.sub = this.route.params.subscribe(params => {
        this.serviceId = +params['id']; // (+) converts string 'id' to a number
    }); 
    this.serviceManager.getService(this.authService.currentUserToken(), this.serviceId).subscribe(
      (res: any) => {
              this.service = res;
              this.car.ServiceId = this.serviceId;
            },
      error =>{
        console.log(error);
      });

      this.httpService.getTypeOfVehicle(this.authService.currentUserToken()).subscribe(
        (res: any) => {
                 
                for(let i=0; i<res.length; i++){
                  this.types.push(res[i]); //use i instead of 0
              }     
        },
        error =>{
    
        });
   }

  ngOnInit() {
  }

  newCar(){
    
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


      this.serviceManager.addNewCar(this.car,this.authService.currentUserId(),this.authService.currentUserToken()).subscribe(

        (res : any) => {

          let price : PriceList;
          price  = new PriceList(-1,res.json().Id,'2018.8.5','2020.5.5',this.car.Price);

          this.serviceManager.addNewPrice(price,this.authService.currentUserToken()).subscribe(

            (res: any) =>
            {
                    console.log('ok');
                    this.car = new Vehicle(-1,'','','','',true,-1,this.serviceId,[],[],-1);
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
              
            alert("Successfully added new vehicle");   
            this.car = new Vehicle(-1,'','','','',true,-1,this.serviceId,[],[],-1);  
      },
      error =>
      {
              alert(error.json().Message);
              return false;
      });
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files;
  }

}
