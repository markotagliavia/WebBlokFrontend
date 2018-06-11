import { Component, OnInit } from '@angular/core';
import { Service } from '../../../Model/service';
import { ServiceManager } from '../../../Services/[services].service'; 
import { AuthService } from '../../../Services/auth.service';
import {DomSanitizer } from '@angular/platform-browser'
@Component({
  selector: 'app-admin-panel-service-managing',
  templateUrl: './admin-panel-service-managing.component.html',
  styleUrls: ['./admin-panel-service-managing.component.css']
})
export class AdminPanelServiceManagingComponent implements OnInit {

  services : Service[];
  safeURL : string;

  constructor(public serviceManager : ServiceManager, public authService : AuthService, private sanitizer: DomSanitizer) { 
    this.services = [];
    this.serviceManager.getServices(this.authService.currentUserToken()).subscribe(
      (res: any) => {
               
              for(let i=0; i<res.length; i++){
                this.services.push(res[i]); //use i instead of 0
            }     
      },
      error =>{
          console.log(error);
          window.alert(error);
      });
  }

  ngOnInit() {
  }

  verifyService(serviceId : number)
  {
    for(let j=0; j<this.services.length; j++){
      if(this.services[j].Id == serviceId)
      {
        this.serviceManager.approveService(this.services[j],this.authService.currentUserToken()).subscribe(
          (res: any) => {
                   
                  for(let i=0; i<this.services.length; i++){
                    if(this.services[i].Id == serviceId)
                    {
                      this.services[i].Approved = true;
                    }
                }     
          },
          error =>{
              console.log(error);
              window.alert(error);
          });

          break;
      }
    }
  }

}
