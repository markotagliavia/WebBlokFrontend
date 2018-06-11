import { Component, OnInit, Injectable, Input, EventEmitter, Output } from '@angular/core';
import { Rate } from '../../../../Model/rate';
import { AuthService } from '../../../../Services/auth.service';
import { ServiceManager } from '../../../../Services/[services].service';
import { HttpService } from '../../../../Services/http-service.service';

@Injectable()
@Component({
  selector: 'app-rate-unit',
  templateUrl: './rate-unit.component.html',
  styleUrls: ['./rate-unit.component.css']
})
export class RateUnitComponent implements OnInit {

  @Input() rate : Rate;
  ocena : number;
  smeDaIzmeni : boolean;
  @Output() messageEvent = new EventEmitter<string>();

  constructor(private authService: AuthService, private serviceManager:ServiceManager,private http: HttpService) { 
    this.smeDaIzmeni = false;
    this.ocena = -1;
  }

  ngOnInit() {
    this.ocena = this.rate.Point;
    //user na sesiji pa uporedi je l sme na osnovu toga da klikce
    if(this.authService.currentUserId()==this.rate.AppUserId)
    {
      this.smeDaIzmeni = true;
    }
    
  }

  oceni(num : number)
  {
    if(this.smeDaIzmeni == true)
    {
      this.rate.Point = num;
      this.ocena = this.rate.Point; //nije ti dobra logika za zvezdice salio sam se :D fuck u my jelene
    }
  }

  edit()
  {
    // to do
    this.serviceManager.editRate(this.rate,this.authService.currentUserToken()).subscribe(
      (res: any) =>
      {
            alert('Successfully edit rate');
      },
      error => 
      {

      }
    )
  }

 

  delete()
  {
    //to do

    this.serviceManager.deleteRate(this.rate,this.authService.currentUserToken()).subscribe(
      (res: any) =>
      {
            alert('Successfully delete rate');
            this.messageEvent.emit('ok');
            
      },
      error => 
      {

      }
    )
  }

}
