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
  rate : Rate;
  rates : Rate[];
  manager : boolean;
  client : boolean;
  admin : boolean;
  types: TypeOfVehicle[];
  cars : Vehicle[];
  carsForPrikaz : Vehicle[];
  serviceId : number;
  service : Service;
  private sub : any;

  manuNameInput : string;
  modelNameInput : string;
  yearInput : string;
  fromPriceInput : number;
  toPriceInput : number;
  typeNameSelected : string;

  pageNumber: number = 1;
  totalNumber: number = 0;
  totalPages: number = 1;
  pageNumbers: number[] = [];
  

  constructor(public httpService: HttpService,private authService: AuthService, private router: Router,private route: ActivatedRoute, private serviceManager : ServiceManager) { 

    this.komentar = '';
    this.smeDaOceni = false;
    this.client = false;
    this.manager = false;
    this.admin = false;
    this.rates = [];
    this.cars = [];
    this.carsForPrikaz = [];
    this.typeNameSelected = "All";
    this.types = [];
    this.manuNameInput = "";
    this.modelNameInput = "";
    this.yearInput = "";
    this.fromPriceInput = 0;
    this.toPriceInput = 9999999; 
    this.service = new Service(-1,'','','','',-1,'',false,0);
    this.serviceId = -1;
    this.rate = new Rate(-1,0,'',-1,-1,null);
    

      //zahtev za sve ocene pa filter po servisu

  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['service'])
    {

      
  
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
        this.serviceManager.allRatesService(this.service.Id,this.authService.currentUserToken()).subscribe
        (
          (res : any) =>
          {
                  res.forEach(element => {
                    this.rates.push(element);
                  });
          },
          error =>
          {
    
          }
          
        )
        if(this.authService.currentUserName() != undefined)
        {
            this.serviceManager.canLeaveComment(this.authService.currentUserId(),this.service.Id,this.authService.currentUserToken()).subscribe
            (
                (res:any) =>
                {
                          this.smeDaOceni = true;
                          
                },
                error =>
                {
                         this.smeDaOceni = false;
                }

                
            )
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

      this.totalNumber = this.cars.length;
      this.totalPages = this.totalNumber / 3;
      for (var index = 1; index < (this.totalPages + 1); index++) {
        this.pageNumbers.push(index);
      }

      this.serviceManager.getCarsPaginig(this.authService.currentUserToken(), this.pageNumber, 3).subscribe(
        (res: any) => {
          for(let i=0; i<res.length; i++){
            if(res[i].ServiceId == this.serviceId)
            {
              this.carsForPrikaz.push(res[i]);
            }
          }
  
          },
          error =>{ 
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

  ocena(star:number)
  {
      this.rate.Point = star;
  }

  oceni()
  {
    //to do
    if(this.rate.Comment.length == 0)
    {
      alert('Comment is required');
      return false;
    }
    this.rate.AppUserId = this.authService.currentUserId();
    this.rate.ServiceId = this.service.Id;
    this.serviceManager.addNewRate(this.rate,this.authService.currentUserToken()).subscribe(

      (res: any) =>
      {

        alert('Successfully add comment');
        this.smeDaOceni = false;
        this.rate = new Rate(-1,0,'',-1,-1,null);
        this.rates = []; 
        this.serviceManager.allRatesService(this.service.Id,this.authService.currentUserToken()).subscribe
        (
          (res : any) =>
          {
                  res.forEach(element => {
                    this.rates.push(element);
                  });
          },
          error =>
          {
    
          })

      },
      error =>
      {
        alert('Do not have permission to leave a comment');
      }
    )
  }

  doPaginacija(num : number)
  {
    var yearParam = "";
    var modelParam = "";
    var manuParam = "";
    if(this.manuNameInput == "")
    {
      manuParam = "*";
    }
    else 
    {
      manuParam = this.manuNameInput;
    }
    if(this.modelNameInput == "")
    {
      modelParam = "*";
    }
    else 
    {
      modelParam = this.modelNameInput;
    }
    if(this.yearInput == "")
    {
      yearParam = "*";
    }
    else 
    {
      yearParam = this.yearInput;
    }

    this.carsForPrikaz = [];
    this.serviceManager.getCarsPaginigWithFilter(this.authService.currentUserToken(), this.pageNumber, 3, manuParam, modelParam, yearParam, this.fromPriceInput, this.toPriceInput, this.typeNameSelected).subscribe(
    (res: any) => {
      for(let i=0; i<res.length; i++){
        if(res[i].ServiceId == this.serviceId)
        {
          this.carsForPrikaz.push(res[i]);
        }
      }

      },
      error =>{ 
        console.log(error);
      });
  }

  receiveDelete($event){

    this.rates = [];
    this.serviceManager.allRatesService(this.service.Id,this.authService.currentUserToken()).subscribe
        (
          (res : any) =>
          {
                  res.forEach(element => {
                    this.rates.push(element);
                  });
          },
          error =>
          {
    
          })

  }

  receiveMessage($event) {
    this.cars = [];
    this.carsForPrikaz = [];
    this.serviceManager.getCars(this.authService.currentUserToken()).subscribe(
      (res: any) => {
               
              for(let i=0; i<res.length; i++){
                this.cars.push(res[i]);
            }     
      },
      error =>{ 
      });

      this.totalNumber = this.cars.length;
      this.totalPages = this.totalNumber / 3;
      for (var index = 1; index < (this.totalPages + 1); index++) {
        this.pageNumbers.push(index);
      }

      this.doPaginacija(1);
  }

}
