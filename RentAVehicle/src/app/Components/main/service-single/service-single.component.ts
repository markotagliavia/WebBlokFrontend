import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { HttpService } from '../../../Services/http-service.service';
import { ServiceManager } from '../../../Services/[services].service';
import { AuthService } from '../../../Services/auth.service';
import { TypeOfVehicle } from '../../../Model/type-of-vehicle';
import { Vehicle } from '../../../Model/vehicle';
import { Service } from '../../../Model/service';
import { Rate } from '../../../Model/rate';
import { Router,ActivatedRoute } from '@angular/router';    

@Component({
  selector: 'app-service-single',
  templateUrl: './service-single.component.html',
  styleUrls: ['./service-single.component.css']
})
export class ServiceSingleComponent implements OnChanges, OnDestroy,OnInit {

  smeDaIzmeni: boolean;
  smeDaOceni: boolean;
  komentar: string;
  rates : Rate[];
  manager : boolean;
  client : boolean;
  admin : boolean;
  types: TypeOfVehicle[];
  cars : Vehicle[];
  serviceId : number;
  service : Service;
  private sub : any;
  

  constructor(public httpService: HttpService,private authService: AuthService, private router: Router,private route: ActivatedRoute, private serviceManager : ServiceManager) { 

    this.komentar = '';
    this.smeDaOceni = true;
    this.client = false;
    this.manager = false;
    this.admin = false;
    this.rates = [];
    this.types = []; //to do uraditi zahtev za dobijanje...
    this.cars = [];
    this.service = new Service(-1,'','','','',-1,'',false,0);
    this.serviceId = -1;
    

      //zahtev za sve ocene pa filter po servisu

  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['service'])
    {

      if(this.service != undefined)
      {

      }
  
    }
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
    this.httpService.getTypeOfVehicle(this.authService.currentUserToken()).subscribe(
      (res: any) => {
               
              for(let i=0; i<res.length; i++){
                this.types.push(res[i]); //use i instead of 0
            }     
      },
      error =>{
         console.log(error);
      });

    this.sub = this.route.params.subscribe(params => {
      this.serviceId = +params['id']; // (+) converts string 'id' to a number
   });

   this.serviceManager.getService(this.authService.currentUserToken(), this.serviceId).subscribe(
    (res: any) => {
             this.service = res;
             if(this.service.AppUserId == this.authService.currentUserId())
             {
                this.smeDaIzmeni = true;
             }
             else
             {
                this.smeDaIzmeni = false;
             }
          },
    error =>{
       console.log(error);
    });

    this.serviceManager.getCars(this.authService.currentUserToken()).subscribe(
      (res: any) => {
               
              for(let i=0; i<res.length; i++){
                if(res[i].serviceId == this.serviceId)
                {
                  this.cars.push(res[i]); //use i instead of 0
                }
            }     
      },
      error =>{
         console.log(error);
         
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  delete()
  {
    
    this.serviceManager.deleteService(this.service,this.authService.currentUserToken()).subscribe(
        (res: any) =>
        {
          alert("Successfully deleted");
          this.router.navigate(['../services']);
        },
        error =>
        {
          alert(error.json().Message);
          this.router.navigate(['../services']);
        }

    )
  }

  oceni()
  {
    //to do
  }

}
