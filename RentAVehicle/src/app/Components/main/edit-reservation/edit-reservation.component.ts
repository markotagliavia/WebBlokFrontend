import { Component, OnInit, OnDestroy} from '@angular/core';
import { Reservation } from '../../../Model/reservation';
import { ServiceManager } from '../../../Services/[services].service';
import { AuthService } from '../../../Services/auth.service';
import { ActivatedRoute } from '@angular/router'; 
import { Branch} from '../../../Model/branch';
import { BranchReservation} from '../../../Model/branch-reservation';


@Component({
  selector: 'app-edit-reservation',
  templateUrl: './edit-reservation.component.html',
  styleUrls: ['./edit-reservation.component.css']
})
export class EditReservationComponent implements OnInit, OnDestroy {

  errorText : string;
  reservation : Reservation;
  branchfrom: string;
  branchto: string;
  branches: Branch[];
  addressPickup : string;
  addressRelease : string;
  price : number;
  reservationId : number;
  private sub : any;

  constructor(private route: ActivatedRoute,private serviceManager : ServiceManager, private authService : AuthService) {
    this.addressPickup = "";
    this.addressRelease = "";
    this.price = 0;
    this.errorText = "";
    this.branchfrom = '';
    this.branchto = '';
    this.branches = [];
    this.reservation = new Reservation(0,false, '','',-1,-1,-1,[]);
    this.sub = this.route.params.subscribe(params => {
      this.reservationId = +params['id']; // (+) converts string 'id' to a number
      this.serviceManager.getReservation(this.reservationId,this.authService.currentUserToken()).subscribe(

        (res:any) =>
        {
              this.reservation = res;
              this.price = this.reservation.TotalPrice;
              this.serviceManager.getBranches(this.authService.currentUserToken()).subscribe(
                (res: any) => {
                          
                        for(let i=0; i<res.length; i++){
                          
                            this.branches.push(res[i]); //use i instead of 0
                            if(this.reservation.BranchReservations[0].BranchId == res[i].Id)
                            {
                                if(this.reservation.BranchReservations[0].Reception == true)
                                {
                                        this.branchfrom = res[i].Name;
                                        this.addressPickup = res[i].Address;
                                }
                                else
                                {
                                        this.branchto = res[i].Name;
                                        this.addressRelease = res[i].Address;
                                }
                            }
                            if(this.reservation.BranchReservations[1].BranchId == res[i].Id)
                            {
                              if(this.reservation.BranchReservations[1].Reception == true)
                              {
                                this.branchfrom = res[i].Name;
                                this.addressPickup = res[i].Address;
                              }
                              else
                              {
                                      this.branchto = res[i].Name;
                                      this.addressRelease = res[i].Address;
                              }

                            }
                      }     
                },
                error =>{
                  console.log(error);
                }
              )
        },
        error =>
        {

        }
      )
   }); 

   // to do zahtev za rezervaciju po Id
   }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  editRes()
  {
    // to do 
    let branch1 : Branch;
    let branch2 : Branch;
    this.branches.forEach(element => {

        if(element.Name == this.branchfrom)
        {
          branch1 = element;

        }
        if(element.Name == this.branchto)
        {
          branch2 = element;
  
        }
      
    });
    this.reservation.BranchReservations = [];
    this.reservation.BranchReservations.push(new BranchReservation(branch1.Id,-1,true,-1));
    this.reservation.BranchReservations.push(new BranchReservation(branch2.Id,-1,false,-1));
    if(this.branchfrom.length == 0 || this.branchto.length  == 0 || this.reservation.StartDate.length == 0 || this.reservation.EndDate.length == 0)
    {
      this.errorText = "All fields are requiered";
      return false;
    }
    else
    {
      let datereservation = new Date(this.reservation.StartDate);
      let dateback = new Date(this.reservation.EndDate);

      if(datereservation > dateback)
      {
        this.errorText = "Start date is bigger than end date";
        return false;
      }
      this.errorText = "";
      this.serviceManager.editReservation(this.reservation,this.authService.currentUserToken()).subscribe
      (
            (res: any) =>
            {
                        this.price = res.json().TotalPrice;
                        alert("Reserved");
                        
            },
            error =>
            {
                        if(error.json().Message == '24')
                        {
                            alert("Less than 24 untill reservation, change is not available");
                        }
                        else
                        {
                          alert("Car is not available");
                        }
                        
            }
      )
    }
  }

  changeSelectionPickup()
  {
    this.branches.forEach(element => {
      
        if(element.Name == this.branchfrom)
        {
          this.addressPickup = element.Address;

        }

    });
    
  }

  changeSelectionRelease()
  {
    this.branches.forEach(element => {
      
      if(element.Name == this.branchto)
      {
        this.addressRelease = element.Address;

      }

  });
  }

  checkRes()
  {
    //to do kreiraj objkte branch
    //this.reservation.VehicleId = this.car.Id;
    if(this.branchfrom.length == 0 || this.branchto.length  == 0 || this.reservation.StartDate.length == 0 || this.reservation.EndDate.length == 0)
    {
      this.errorText = "All fields are requiered";
      return false;
    }
    else
    {
      let datereservation = new Date(this.reservation.StartDate);
      let dateback = new Date(this.reservation.EndDate);

      if(datereservation > dateback)
      {
        this.errorText = "Start date is bigger than end date";
        return false;
      }

      this.errorText = "";

      //tu samo sracunaj cenu
      this.serviceManager.checkReservationEdit(this.reservation,this.authService.currentUserToken()).subscribe
      (
        (res:any) =>
        {
              this.price = res._body;
        },
        error =>
        {
          if(error.json().Message == '24')
          {
              alert("Less than 24 untill reservation, change is not available");
          }
          else
          {
            alert("Car is not available");
          }
        }
      )
    }
  }

}
