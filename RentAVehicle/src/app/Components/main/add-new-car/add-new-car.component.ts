import { Component, OnInit, OnDestroy } from '@angular/core';
import { Vehicle } from '../../../Model/vehicle';
import { Service } from '../../../Model/service';
import { ServiceManager } from '../../../Services/[services].service';
import { AuthService } from '../../../Services/auth.service';
import { HttpService } from '../../../Services/http-service.service';
import { ActivatedRoute } from '@angular/router'; 
import { TypeOfVehicle } from '../../../Model/type-of-vehicle'; 

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
    this.car = new Vehicle(-1,'','','','',false,-1,-1,[]);
    this.service = new Service(0,'', '','','',-1,'',false,0);
    this.errorText = "";
      this.sub = this.route.params.subscribe(params => {
        this.serviceId = +params['id']; // (+) converts string 'id' to a number
    }); 
    this.serviceManager.getService(this.authService.currentUserToken(), this.serviceId).subscribe(
      (res: any) => {
              this.service = res;
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
    //ispravi ovo
    if(this.car.Mark.length == 0 || this.car.Model.length == 0 || this.car.Year.length == 0 || this.car.Description.length == 0)
    {
       this.errorText = "All fields except picture are requiered";
       return false;
    }
    else
    {
      this.errorText = "";
      //dodaj kola
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files;
  }

}
