import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../Services/http-service.service';
import { AuthService } from '../../../Services/auth.service'; 
import { AppUser } from '../../../Model/app-user'; 

@Component({
  selector: 'app-admin-panel-client-managing',
  templateUrl: './admin-panel-client-managing.component.html',
  styleUrls: ['./admin-panel-client-managing.component.css']
})
export class AdminPanelClientManagingComponent implements OnInit {

  appUsers : AppUser[];
  managers : AppUser[];

  constructor(public httpService: HttpService,private authService: AuthService) { 
    this.appUsers = [];
    this.httpService.getAllUsers(this.authService.currentUserToken()).subscribe(
      (res: any) => {
               
              for(let i=0; i<res.length; i++){
                this.appUsers.push(res[i]); //use i instead of 0
            }     
      },
      error =>{
          console.log(error);
          window.alert(error);
      });

      //tijana to do
      this.httpService.getAllUsers(this.authService.currentUserToken()).subscribe(
        (res: any) => {
                 
                for(let i=0; i<res.length; i++){
                  this.managers.push(res[i]); //use i instead of 0
              }     
        },
        error =>{
            console.log(error);
            window.alert(error);
        });
  }

  ngOnInit() {
  }

}
