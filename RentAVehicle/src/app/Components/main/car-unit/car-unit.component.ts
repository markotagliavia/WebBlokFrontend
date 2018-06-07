import { Component, OnInit, OnDestroy, Injectable, Input } from '@angular/core';
import { HttpService } from '../../../Services/http-service.service';
import { AuthService } from '../../../Services/auth.service';
import { ServiceManager } from '../../../Services/[services].service';  
import { Car } from '../../../Model/car';

@Injectable()
@Component({
  selector: 'app-car-unit',
  templateUrl: './car-unit.component.html',
  styleUrls: ['./car-unit.component.css']
})
export class CarUnitComponent implements OnInit{

  @Input() car : Car;
  client : boolean;
  manager : boolean;
  admin : boolean;

  constructor(private authService: AuthService, private httpService: HttpService, private serviceManager : ServiceManager) {
    this.client = false;
    this.manager = false;
    this.admin = false;
   }

  ngOnInit() {
    if(this.authService.currentUserName() != undefined)
    {
        if(this.authService.currentUserName().length > 0)
        {
            if(this.authService.isLoggedInRole('Admin'))
            {
              this.admin = true;
              this.client = true;
            }
            else if(this.authService.isLoggedInRole('Manager'))
            {
              this.manager = true;
              this.client = true;
            }
            else if(this.authService.isLoggedInRole('AppUser'))
            {
              this.client = true;
            }
        }
    }
  }

  deleteVehicle()
  {
    //to do
  }

}
