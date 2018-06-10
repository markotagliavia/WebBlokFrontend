import { Component, OnInit, Injectable, Input, OnChanges, SimpleChanges, Output,EventEmitter } from '@angular/core';
import { AuthService } from '../../../Services/auth.service';
import { HttpService } from '../../../Services/http-service.service';
import { NotificationService } from '../../../Services/notification.service';
import {
  Router,
  ActivatedRoute
} from '@angular/router'; 

@Injectable()
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnChanges {

  @Input() childMessage: string;
  @Output() messageEvent = new EventEmitter<string>();
  client : boolean;
  manager : boolean;
  admin : boolean;
  PA

  constructor(private authService: AuthService, private router: Router, private httpService: HttpService,private notifService : NotificationService) {
    this.client = false;
    this.manager = false;
    this.admin = false;
   }

  ngOnInit() {
    this.refreshView();
  }

 
  ngOnChanges(changes: SimpleChanges) {
      if(changes['childMessage'])
      {
        if(this.childMessage != 'empty')
        {
          //alert("RADIIIIIIII");
         this.refreshView();
         //this.childMessage = 'empty';
        }
      }
  }




  refreshView()
  {
    this.client = false;
    this.manager = false;
    this.admin = false;
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
            else if(this.authService.isLoggedInRole('Manager') && !this.authService.currentUser().approved)
            {
              this.client = true;
            }
            else if(this.authService.isLoggedInRole('AppUser'))
            {
              this.client = true;
            }
        }
    }
  }

  logOut()
  {
    this.httpService.logOut(this.authService.currentUserToken(),this.authService.currentUserId()).subscribe
    (
          (res: any) => {
             
            this.authService.logOut();//heade
            this.router.navigate(['home/login']);
            this.notifService.UnsubscribeForNotifications();
            this.refreshView();
            window.location.reload();
          },
          error =>{

            alert(error.json().Message); 
                
        }
      
      
      )
    
  }

  

}
