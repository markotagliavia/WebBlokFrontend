import { Component, OnInit, OnDestroy, Injectable, Input, OnChanges, SimpleChanges, Output,EventEmitter } from '@angular/core';
import { HttpService } from '../../../Services/http-service.service';
import { AuthService } from '../../../Services/auth.service';
import { ServiceManager } from '../../../Services/[services].service';  
import { Vehicle } from '../../../Model/vehicle';


@Injectable()
@Component({
  selector: 'app-car-unit',
  templateUrl: './car-unit.component.html',
  styleUrls: ['./car-unit.component.css']
})
export class CarUnitComponent implements OnInit , OnChanges{

  @Input() car : Vehicle;
  client : boolean;
  manager : boolean;
  admin : boolean;
  idui : string;
  @Output() messageEvent = new EventEmitter<string>();

  

  constructor(private authService: AuthService, private httpService: HttpService, private serviceManager : ServiceManager) {
    this.client = false;
    this.manager = false;
    this.admin = false;
    //this.idui = "switch" + this.car.Id;
   }

   ngOnChanges(changes: SimpleChanges) {
    if(changes['car'])
    {
      if(this.car != undefined)
      {
        this.serviceManager.getPrice(this.authService.currentUserToken(),this.car.Id).subscribe(
          (res: any) => {
            this.car.Price = res.Price;
          },
          error => 
          {

          }
        )
        
      }
      
    }
    
  }

  ngOnInit() {
    this.idui = "switch" + this.car.Id;
    if(this.authService.currentUserName() != undefined)
    {
        if(this.authService.currentUserName().length > 0)
        {
            if(this.authService.isLoggedInRole('Admin'))
            {
              this.admin = true;
              this.client = true;
            }
            else if(this.authService.isLoggedInRole('Manager') && this.authService.currentUser().approved)
            {
              this.manager = true;
              this.client = true;
            }
            else if(this.authService.isLoggedInRole('AppUser') && this.authService.currentUser().approved)
            {
              this.client = true;
            }
        }
    }
  }

  checkedChange(num : number)
  {
    if (this.car.Available == false) {
     this.serviceManager.setAvailable(num, this.authService.currentUserToken()).subscribe(
        (res : any) => { 
           // this.car.Available = true;
        },
        error =>{
            console.log(error);
            window.alert(error);
        });
    } else {
      this.serviceManager.setAvailable(num, this.authService.currentUserToken()).subscribe(
        (res : any) => { 
          //this.car.Available = false;
        },
        error =>{
            console.log(error);
            window.alert(error);
        });
    }
  }


  deleteVehicle()
  {
    this.serviceManager.deleteCar(this.car,this.authService.currentUserToken()).subscribe(

      (res: any) =>
      {
        this.messageEvent.emit('ok');
      },
      error =>
      {

      }
      
    )
  }

}
